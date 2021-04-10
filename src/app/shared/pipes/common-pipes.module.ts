import { NgModule } from "@angular/core";
import { FindItemPipe } from './find-item.pipe';

@NgModule({
    declarations: [FindItemPipe],
    imports:[],
    exports:[FindItemPipe]
})

export class CommonPipesModule {};