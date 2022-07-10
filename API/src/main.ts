require("dotenv").config();
// eslint-disable-next-line @typescript-eslint/no-var-requires
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import * as compression from "compression";
import * as helmet from "helmet";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle("Requirements uploader API")
    .setDescription("API for requirements uploader")
    .setVersion("1.2")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("/api", app, document);

  await app.listen(process.env.PORT || 3001);
  app.use(compression);
}
bootstrap();
