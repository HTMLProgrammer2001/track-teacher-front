import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './views/home/home.component';
import {BookmarkProcessGuard} from '../../global/services/bookmark/bookmark-process.guard';
import {EmptyPageComponent} from './views/empty-page/empty-page.component';
import {AuthGuard} from '../../global/services/auth/auth.guard';

export const routingPaths = {
  home: '',
  empty: 'empty',
};
const routes: Routes = [
  {
    path: routingPaths.home,
    component: HomeComponent,
    canActivate: [AuthGuard, BookmarkProcessGuard],
    canDeactivate: [BookmarkProcessGuard],
    data: {allowPinning: true},
  },
  {
    path: routingPaths.empty,
    component: EmptyPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule { }
