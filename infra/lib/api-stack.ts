import * as cdk from "aws-cdk-lib";
import { Stack, StackProps } from "aws-cdk-lib";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as ecs from "aws-cdk-lib/aws-ecs";
import * as ecs_patterns from "aws-cdk-lib/aws-ecs-patterns";
import * as path from "path";
import { Construct } from "constructs";

export class ApiStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // 1️⃣ Create VPC (2 AZs)
    const vpc = new ec2.Vpc(this, "ApiVpc", {
      maxAzs: 2,
    });

    // 2️⃣ ECS Cluster
    const cluster = new ecs.Cluster(this, "ApiCluster", {
      vpc,
      clusterName: "ApiCluster",
    });

    // 3️⃣ Fargate Service with ALB
    const apiService = new ecs_patterns.ApplicationLoadBalancedFargateService(
      this,
      "ApiService",
      {
        cluster,
        cpu: 256,
        memoryLimitMiB: 512,
        desiredCount: 2,
        publicLoadBalancer: true,
        taskImageOptions: {
          image: ecs.ContainerImage.fromAsset(
            path.join(__dirname, "../../app/Api")
          ),
          containerPort: 80,
        },
        healthCheckGracePeriod: cdk.Duration.seconds(60), // for this app this really does not matter. however, for apps that take time to start, this is useful.
      }
    );

    // ✅ Configure ALB health check
    apiService.targetGroup.configureHealthCheck({
      path: "/health",
    });
  }
}
