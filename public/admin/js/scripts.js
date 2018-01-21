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
                axios.post('/admin//category/add', {
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
    },
    computed : {

    }
});