import { ProductService } from './../shared/product.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  formModels:FormGroup;
  categories:string[];
  constructor(private productService:ProductService) { 
    
  }

  ngOnInit() {
    let fb=new FormBuilder();
    this.formModels=fb.group({
      title:['',Validators.minLength(3)],
      price:[null,this.postiveNumberValidator],
      category:['-1']
    })
    this.categories = this.productService.getAllCategories();
  }
  postiveNumberValidator(control:FormControl):any{
    if(!control.value){
      return null;
    }
    let price = parseInt(control.value);
    if(price>0){
      return null;
    }else{
      return {postiveNumber:true}
    }
  }
  onSearch(){
    if(this.formModels.valid){
      console.log(this.formModels.value)
      this.productService.searchEvent.emit(this.formModels.value)
    }
  }
}
