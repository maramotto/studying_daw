
// Imports

const appRoutes: Routes = [
    { path: 'main', component: MainComponent },
    { path: 'purchase/:id', component: PurchaseComponent },
    { path: 'admin', component: AdminComponent },
    { path: '', redirectTo: 'main', pathMatch: 'full' }
]

export const routing = RouterModule.forRoot(appRoutes);