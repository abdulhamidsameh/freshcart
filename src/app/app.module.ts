import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';
import { ProductComponent } from './Components/product/product.component';
import { CartComponent } from './Components/cart/cart.component';
import { BrandsComponent } from './Components/brands/brands.component';
import { CategoriesComponent } from './Components/categories/categories.component';
import { NavbarBlankComponent } from './Components/navbar-blank/navbar-blank.component';
import { NavbarAuthComponent } from './Components/navbar-auth/navbar-auth.component';
import { FooterComponent } from './Components/footer/footer.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { RegisterComponent } from './Components/register/register.component';
import { LoginComponent } from './Components/login/login.component';
import { AuthLayoutComponent } from './Layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './Layouts/blank-layout/blank-layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CutTextPipe } from './Core/cut-text.pipe';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { PaymentComponent } from './Components/payment/payment.component';
import { AllordersComponent } from './Components/allorders/allorders.component';
import { CategoryDetailsComponent } from './Components/category-details/category-details.component';
import { BrandsDetailsComponent } from './Components/brands-details/brands-details.component';
import { SearchPipe } from './Core/search.pipe';
import { ForgotPasswordComponent } from './Components/forgot-password/forgot-password.component';
import { ResetCodeComponent } from './Components/reset-code/reset-code.component';
import { ChangePasswordComponent } from './Components/change-password/change-password.component';
import { WishListComponent } from './Components/wish-list/wish-list.component';
import { MyHttpInterceptor } from './my-http.interceptor';
import { WishListPipe } from './wish-list.pipe';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductComponent,
    CartComponent,
    BrandsComponent,
    CategoriesComponent,
    NavbarBlankComponent,
    NavbarAuthComponent,
    FooterComponent,
    NotFoundComponent,
    RegisterComponent,
    LoginComponent,
    AuthLayoutComponent,
    BlankLayoutComponent,
    CutTextPipe,
    ProductDetailsComponent,
    PaymentComponent,
    AllordersComponent,
    CategoryDetailsComponent,
    BrandsDetailsComponent,
    SearchPipe,
    ForgotPasswordComponent,
    ResetCodeComponent,
    ChangePasswordComponent,
    WishListComponent,
    WishListPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    BrowserAnimationsModule,
    CarouselModule,
    FormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: MyHttpInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
