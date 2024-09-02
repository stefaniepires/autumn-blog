import { NgModule } from '@angular/core';
import { ToastrModule, provideToastr } from 'ngx-toastr';

@NgModule({
  imports: [
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      resetTimeoutOnDuplicate: true,
    }),
  ],
  exports: [ToastrModule],
})
export class ToToastrModule {}

export const provideToToastr = () => {
  return provideToastr({
    positionClass: 'toast-bottom-right',
    preventDuplicates: true,
    resetTimeoutOnDuplicate: true,
  });
};
