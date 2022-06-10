import { NgModule } from "@angular/core";
import { Routes,RouterModule } from "@angular/router";
import { AdminComponent } from "./components/admin/admin.component";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { TicketComponent } from "./components/ticket/ticket.component";
import { AuthGuard } from "./guards/auth.guard";
import { RoleGuard } from "./guards/role.guard";

const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'ticket', component: TicketComponent, canActivate: [AuthGuard]},
    { path: 'admin', component: AdminComponent,canActivate:[RoleGuard] ,data:{expectedRole: 'Testing@gmail.com'} },
    { path: 'login', component: LoginComponent },
    { path: '**', pathMatch: 'full',redirectTo: 'home' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule{}