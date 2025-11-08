import { Routes } from '@angular/router';
import { Tasks } from './features/tasks/tasks';
import { Dashboard } from './features/dashboard/dashboard';
export const routes: Routes = [
    { path: '', component: Dashboard },
    { path: 'tasks', component: Tasks },
];
