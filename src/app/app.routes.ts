import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./core/layout/main/layout-main.component').then(c => c.LayoutMainComponent),
    children: [
      { path: '', loadComponent: () => import('./features/home/home.component').then(c => c.HomeComponent) },
      { path: 'privacy-policy', loadComponent: () => import('./features/privacy-policy/privacy-policy.component').then(c => c.PrivacyPolicyComponent) },
      { path: 'cookie-policy', loadComponent: () => import('./features/cookie-policy/cookie-policy.component').then(c => c.CookiePolicyComponent) },
    ]
  },
  {
    path: 'payment',
    loadComponent: () => import('./core/layout/secondary/layout-secondary.component').then(c => c.LayoutSecondaryComponent),
    children: [
      { path: '', loadComponent: () => import('./features/payment/features-payment.component').then(c => c.FeaturesPaymentComponent) },
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
