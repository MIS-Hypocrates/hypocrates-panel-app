import { Container } from "inversify";
import { buildProviderModule } from "inversify-binding-decorators";
import "reflect-metadata";
import "@/shared/utils/FunctionUtils"
import "@/shared/utils/FileBucket"
import "@/shared/Api"

const container = new Container();

container.load(buildProviderModule());


export { container }