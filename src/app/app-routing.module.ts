import { authGuard } from './guard/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { CartComponent } from './Components/cart/cart.component';
import { ProductComponent } from './Components/product/product.component';
import { CategoriesComponent } from './Components/categories/categories.component';
import { BrandsComponent } from './Components/brands/brands.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { AuthLayoutComponent } from './Layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './Layouts/blank-layout/blank-layout.component';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';
import { PaymentComponent } from './Components/payment/payment.component';
import { AllordersComponent } from './Components/allorders/allorders.component';
import { CategoryDetailsComponent } from './Components/category-details/category-details.component';
import { BrandsDetailsComponent } from './Components/brands-details/brands-details.component';
import { ForgotPasswordComponent } from './Components/forgot-password/forgot-password.component';
import { ResetCodeComponent } from './Components/reset-code/reset-code.component';
import { ChangePasswordComponent } from './Components/change-password/change-password.component';
import { WishListComponent } from './Components/wish-list/wish-list.component';
const routes: Routes = [
  {
    path: '',
    component: BlankLayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [authGuard],
        title: 'Home',
      },
      {
        path: 'cart',
        component: CartComponent,
        canActivate: [authGuard],
        title: 'Cart',
      },
      {
        path: 'allorders',
        component: AllordersComponent,
        canActivate: [authGuard],
        title: 'All Orders',
      },
      {
        path: 'payment/:id',
        component: PaymentComponent,
        canActivate: [authGuard],
        title: 'Payment',
      },
      {
        path: 'products',
        component: ProductComponent,
        canActivate: [authGuard],
        title: 'Products',
      },
      {
        path: 'wishList',
        component: WishListComponent,
        canActivate: [authGuard],
        title: 'Wish List',
      },
      {
        path: 'productDetails/:id',
        component: ProductDetailsComponent,
        canActivate: [authGuard],
        title: 'Product Details',
      },
      {
        path: 'categories',
        component: CategoriesComponent,
        canActivate: [authGuard],
        title: 'Categories',
      },
      {
        path: 'categoryDetails/:id',
        component: CategoryDetailsComponent,
        canActivate: [authGuard],
        title: 'Category Details',
      },
      {
        path: 'brands',
        component: BrandsComponent,
        canActivate: [authGuard],
        title: 'Brands',
      },
      {
        path: 'brandsDetails/:id',
        component: BrandsDetailsComponent,
        canActivate: [authGuard],
        title: 'Brands Details',
      },
      {
        path: 'forgotPassword',
        canActivate: [authGuard],
        component: ForgotPasswordComponent,
        title: 'Forgot Password',
      },
      {
        path: 'resetCode',
        canActivate: [authGuard],
        component: ResetCodeComponent,
        title: 'Reset Code',
      },
      {
        path: 'changePassword',
        canActivate: [authGuard],
        component: ChangePasswordComponent,
        title: 'Change Password',
      },
    ],
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full', title: 'Login' },
      { path: 'login', component: LoginComponent, title: 'Login' },
      { path: 'register', component: RegisterComponent, title: 'Register' },
      {
        path: 'authForgotPassword',
        component: ForgotPasswordComponent,
        title: 'Forgot Password',
      },
      {
        path: 'authResetCode',
        component: ResetCodeComponent,
        title: 'Reset Code',
      },
      {
        path: 'authChangePassword',
        component: ChangePasswordComponent,
        title: 'Change Password',
      },
    ],
  },

  { path: '**', component: NotFoundComponent, title: 'NotFound' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
