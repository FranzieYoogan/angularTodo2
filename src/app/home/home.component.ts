import { Component, OnInit } from '@angular/core';
import { CrudsService } from '../cruds.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  constructor(private cruds: CrudsService,
    private http: HttpClient
  ){}

  data:any
  ngOnInit(): void {

    const time:any = document.getElementById('time')
    const check:any = document.getElementById('check')


    const datee = new Date()
    const hours = datee.getHours()
    const minutes = datee.getMinutes()
    const seconds = datee.getSeconds()
    time.innerHTML = `${hours}:${minutes}`

      

    this.cruds.getData().subscribe(config => {
      
      this.data = config
      console.log(config)
    },
  error => {
    console.log("fetching error",error)
  });



  }



  showPost() {

    const containerAll:any = document.getElementById('containerAll')
    const containerNew:any = document.getElementById('containerNew')

    containerAll.style.display = "none"
    containerNew.style.display = "flex"
    containerNew.style.opacity = "0.9"




  }

  postData() {

    const inputName:any = document.getElementById('inputName')
    const inputTask:any = document.getElementById('inputTask')

    const body = {

      name: inputName.value,
      task: inputTask.value,
      confirm: "0"
    }

        this.http.post<any>('http://localhost:3000/todo', body).subscribe(config => {
          console.log('Updated config:', config);
        });
        
        setTimeout(() => {

          window.location.href ="/"
        }, 300);
  }

  confirm(item: any) {

    const body = { 
      
      confirm: '1'

     };
    this.http.put<any>(`http://localhost:3000/todo/${item}`, body)
        .subscribe(data => console.log('updated',data));

         setTimeout(() => {

           window.location.href = "/"

         }, 1000);

  }

  delete(item:any) {

    this.http.delete<any>(`http://localhost:3000/todo/${item}`)
        .subscribe(data => console.log('deleted',data));

         setTimeout(() => {

           window.location.href = "/"

         }, 1000);

  }
}
