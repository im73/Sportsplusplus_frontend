import JsonP from 'jsonp'
import axios from 'axios'
import { Modal ,message} from 'antd'
export default class Axios {
    static jsonp(options) {
        return new Promise((resolve, reject) => {
            JsonP(options.url, {
                param: 'callback'
            }, function (err, response) {
                if (response.status == 'success') {
                    resolve(response);
                } else {
                    reject(response.messsage);
                }
            })
        })
    }

    static ajax(options){
        // let loading;
        // if (options.data && options.data.isShowLoading !== false){
        //     loading = document.getElementById('ajaxLoading');
        //     loading.style.display = 'block';
        // }
        if(options.url==='/back_login') ;
        else{
            console.log(localStorage.getItem("username"));
            if (localStorage.getItem("username"));
            else
                window.location.href="/login";
        }
        let baseApi = 'http://114.116.156.240/api';
        return new Promise((resolve,reject)=>{
            axios({
                url:options.url,
                method:options.method,
                baseURL:baseApi,
                timeout:5000,
                params: (options.data && options.data.params) || '',
                crossDomain:true,
            }).then((response)=>{
                // if (options.data && options.data.isShowLoading !== false) {
                //     loading = document.getElementById('ajaxLoading');
                //     loading.style.display = 'none';
                // }

                // console.log(response.data);
                console.log(response.data);
                resolve(response);


            }).catch((data)=>{
                message.error("");
            })
        });
    }
}
