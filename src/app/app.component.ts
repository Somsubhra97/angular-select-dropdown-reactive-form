import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Model, IModel } from "./Model";
import { AppService } from "./app.service";
import { Subscription } from "rxjs";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  private postsSub: Subscription;
  isSubmitted = false;
  array: Model[] = [];
  idx: number = -1;
  City: any = ["Florida", "South Dakota", "Tennessee", "Michigan"];
  Regions: String[] = [];
  constructor(public fb: FormBuilder, public postsService: AppService) {
    this.init();
  }

  ngOnInit() {
    this.postsSub = this.postsService
      .getPostUpdateListener()
      .subscribe((res: Model[]) => {
        this.array = res;
      });
  }
  registrationForm: any;
  private init() {
    this.registrationForm = this.fb.group({
      city: ["", [Validators.required]],
      name: ["", [Validators.required]],
      region: ["", [Validators.required]]
    });
  }

  // Choose city using select dropdown
  changeCity(e) {
    this.city.setValue(e.target.value.split(" ")[1], {
      onlySelf: true
    });
    this.Regions = ["Vice_Beach", "Downing_St."];
  }
  changeRegion(e) {
    this.region.setValue(e.target.value.split(" ")[1], {
      onlySelf: true
    });
  }
  // Getter method to access formcontrols
  get city() {
    return this.registrationForm.get("city");
  }
  get region() {
    return this.registrationForm.get("region");
  }

  /*########### Template Driven Form ###########*/
  onSubmit() {
    this.isSubmitted = true;
    if (this.registrationForm.invalid) {
      return false;
    } else {
      if (this.idx < 0) {
        this.postsService.addPosts(this.registrationForm.value);
      } else {
        this.postsService.updatePost(this.idx, this.registrationForm.value);
      }
      this.registrationForm.reset();
      this.idx = -1;
    }
  }
  edit(id: any) {
    this.idx = +id;
    const data: IModel = this.postsService.getPost(this.idx);
    this.registrationForm.get("city").setValue(data.city);
    this.registrationForm.get("name").setValue(data.name);
    this.registrationForm.get("region").setValue(data.region);
  }
  delete(i: any) {
    this.postsService.deletePost(+i);
  }
}
