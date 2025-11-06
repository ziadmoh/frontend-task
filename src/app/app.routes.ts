import { Routes } from '@angular/router';
import { Tasks } from './tasks/tasks';
import { Dashboard } from './dashboard/dashboard';
export const routes: Routes = [
    { path: '', component: Dashboard },
    { path: 'tasks', component: Tasks },
];
