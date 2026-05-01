const appRoutes: Routes = [
    { path: 'games', component: GamesComponent },
    { path: 'game/:id', component: GameComponent },
    { path: '', redirectTo: 'games', pathMatch: 'full' }
]

export const routing = RouterModule.forRoot(appRoutes);