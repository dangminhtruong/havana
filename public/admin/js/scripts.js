$(function () {
    $('#supported').text('Supported/allowed: ' + !!screenfull.enabled);

    if (!screenfull.enabled) {
        return false;
    }
    $('#toggle').click(function () {
        screenfull.toggle($('#container')[0]);
    });
});
                     
var category_add = new Vue({
    el : '#category_add',
    data : {
        categoryType : null,
        categoryName : null,
        categoryDesc : null,
        alertTypeNull : null,
        alertDescNull : null,
        alertNameNull : null
    },
    methods : {
        resetForm : function(){
            this.categoryType = null;
            this.categoryName = null;
            this.categoryDesc = null;
            this.alertTypeNull = null;
            this.alertDescNull = null;
            this.alertNameNull = null;
        },
        submited : function(){
            if(this.categoryDesc == null){
                return this.alertDescNull = 'This field is required';
            }
            else if(this.categoryName ==  null){
                return this.alertNameNull = 'This field is required';
            }
            else if(this.categoryType == null){
                return this.alertTypeNull = 'This field is required';
            }else {
                axios.post('/admin/category/add', {
                    type : this.categoryType,
                    name: this.categoryName,
                    desc: this.categoryDesc,
                })
                .then(function (response) {
                    if(response.data.status === 'inserted'){
                        category_add.resetForm();
                        toastr.options.closeButton = true;
                        toastr.success('New category inserted!')
                    }
                })
                .catch(function (error) {
                    toastr.options.closeButton = true;
                    toastr.warning('Opps!, something went wrong')
                });
            }
        } 
    }
});

var admin_index = new Vue({
    el : '#admin_index',
    data : {

    },
    methods : {
        
    },
    mounted : function(){

        axios.get('/admin/line-chart')
        .then(function (response) {
           let data = response.data;
           new Chart(document.getElementById("line-chart"), {
            type: 'line',
            data: {
              labels: ['Chủ nhật','Thứ 2','Thứ 3','Thứ 4','Thứ 5','Thứ 6','Thứ 7'],
              datasets: [{ 
                  data: [data.sunday, data.monday, data.tueDay, data.weDay, data.thuDay, data.friDay, data.satuDay],
                  label: "Biên độ doanh thu",
                  borderColor: "#F25C27",
                  fill: false
                }
              ]
            },
            options: {
              title: {
                display: true,
                text: 'Đồ thị doanh thu tuần này '
              }
            }
          });
        })
        .catch(function (error) {
            console.log(error);
        });
    }
});

