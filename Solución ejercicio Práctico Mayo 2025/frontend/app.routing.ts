const appRoutes: Routes = [
    { path: 'ads', component: AdsComponent },
    { path: 'ad/:id', component: AdComponent },
    { path: '', redirectTo: 'ads', pathMatch: 'full' }
]

export const routing = RouterModule.forRoot(appRoutes);