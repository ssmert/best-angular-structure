import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilService } from '@shared/services/util.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // 폼
  form: FormGroup;
  isSubmit: boolean = false;
  // ! ************************************** 초기화 메서드 ***************************************

  /**
   * @param formBuilder 폼 빌더
   */
  constructor(
    private formBuilder: FormBuilder,
    private utilService: UtilService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      userId: ['', [Validators.required]],
    });
  }

  // 폼 컨트롤을 반환한다.
  get f(): any { return this.form.controls; }

  // ! ************************************** 이벤트 메서드 *************************************** 

  onSubmit() {
    this.isSubmit = true;
  }

  // ! ************************************** 서버 거래 메서드 *************************************

}
