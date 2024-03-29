import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {Validator} from '../../../shared/types/validation/validator';
import {ValidationTypes} from '../../../shared/types/validation/validation-types';
import {ILoginViewModel} from '../../../global/types/auth/login-view-model';
import {TranslateService} from '@ngx-translate/core';
import {CustomNotificationService} from '../../../global/services/custom-notification.service';
import {AuthService} from '../../../global/services/auth/auth.service';
import {Status} from '../../../global/types/status';
import {ActivatedRoute, Router} from '@angular/router';
import {BookmarkService} from '../../../global/services/bookmark/bookmark.service';
import {DialogRef} from '@progress/kendo-angular-dialog/dist/es2015/dialog/dialog-settings';
import {ConfigService} from '../../../global/services/config/config.service';
import {ButtonControlComponent} from '../../../shared/components/button-control/button-control.component';
import {NetworkStatusService} from '../../../global/services/network-status.service';
import {ErrorService} from '../../../global/services/error.service';
import {LanguageService} from '../../../global/services/language.service';
import {ILanguageViewModel} from '../../../global/types/language';
import {Title} from '@angular/platform-browser';
import {AuthMapperService} from '../../../global/services/auth/auth-mapper.service';

@Component({
  selector: 'cr-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @ViewChild('loginButton') loginButton: ButtonControlComponent;
  public loginValidator: Validator;
  public user: ILoginViewModel;
  public appVersion: string;
  private isPopupOpen: boolean;
  public languages: Array<ILanguageViewModel> = [];
  public companySearchFilter = '';

  constructor(
    private title: Title,
    private authService: AuthService,
    private authMapper: AuthMapperService,
    private translate: TranslateService,
    private router: Router,
    private route: ActivatedRoute,
    private bookmarkService: BookmarkService,
    private customNotificationService: CustomNotificationService,
    private configService: ConfigService,
    private errorService: ErrorService,
    private languageService: LanguageService,
    public networkStatusService: NetworkStatusService,
  ) {
    this.appVersion = configService.getVersion().appVersion;

    this.initValidator();
    this.user = this.authMapper.initializeLoginViewModel();
    authService.cleanAuthState();
  }

  @HostListener('document:keypress', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (['Enter', 'NumpadEnter'].includes(event.code)) {
      event.preventDefault();

      if (!this.isPopupOpen) {
        this.login();
      }
    }
  }

  ngOnInit(): void {
    this.authService.stopLogoffTimer();

    this.languageService.getLanguages$().subscribe(
      languages => this.languages = languages,
      error => this.customNotificationService.showDialogError(this.errorService.getMessagesToShow(error.errors))
    );
  }

  initValidator(): void {
    this.loginValidator = new Validator(
      {
        type: ValidationTypes.email,
        fieldName: 'email',
        messageTranslateKey: 'LOGIN.VALIDATION.VALIDATE_EMAIL'
      },
      {
        type: ValidationTypes.required,
        fieldName: 'email',
        messageTranslateKey: 'LOGIN.VALIDATION.REQUIRED_EMAIL'
      },
      {
        type: ValidationTypes.required,
        fieldName: 'password',
        messageTranslateKey: 'LOGIN.VALIDATION.REQUIRED_PASSWORD'
      },
      {
        type: ValidationTypes.minLength,
        fieldName: 'password',
        settingValue: 8,
        messageTranslateKey: 'LOGIN.VALIDATION.PASSWORD_MIN_LENGTH'
      }
    );
  }

  login(): void {
    this.loginValidator.validateDto(this.user);
    if (this.loginValidator.dtoValidationResult.isValid) {
      this.authService.login(this.user).subscribe(value => {
        if (value.status === Status.ok) {
          this.languageService.getLanguages$().subscribe(languages => {
            this.router.navigate([this.route.snapshot.queryParamMap.get('redirect') ?? '/'], {
              queryParams: {
                ...this.route.snapshot.queryParams,
                redirect: null,
              }
            }).then(() => {
                if (languages.some(lang => lang.code === this.languageService.getCurrentLanguageCode())) {
                  this.translate.use(this.languageService.getCurrentLanguageCode());
                } else {
                  const defaultLang = languages.find(lang => lang.isDefault);
                  this.languageService.setCurrentLanguage(defaultLang);
                  this.translate.use(defaultLang.code);
                }
              });
          });
        }
      }, error => {
        const dialogRef = this.customNotificationService.showDialogError(this.errorService.getMessagesToShow(error.errors));
        this.processDialog(dialogRef);
      });
    } else {
      const dialogRef = this.customNotificationService.showDialogValidation(this.loginValidator);
      this.processDialog(dialogRef);
    }
  }

  private processDialog(dialogRef: DialogRef) {
    this.isPopupOpen = true;
    dialogRef.result.subscribe(() => this.isPopupOpen = false);
  }
}
