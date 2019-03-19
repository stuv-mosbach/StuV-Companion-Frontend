import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'lectures', loadChildren: './lectures/lectures.module#LecturesPageModule' },
  { path: 'news', loadChildren: './news/news.module#NewsPageModule' },
  { path: 'events', loadChildren: './events/events.module#EventsPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
