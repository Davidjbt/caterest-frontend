import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {PostComponent} from './components/post/post.component';
import {UserProfileComponent} from './components/user-profile/user-profile.component';
import {ResultsComponent} from "./components/results/results.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'image/:pictureId', component: PostComponent},
  {path: 'results', component: ResultsComponent},
  {path: ':displayName', component: UserProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
