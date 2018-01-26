$(function () {
	$('#supported').text('Supported/allowed: ' + !!screenfull.enabled);

	if (!screenfull.enabled) {
		return false;
	}
	$('#toggle').click(function () {
		screenfull.toggle($('#container')[0]);
	});
});

$('.btn-admore').click(function() {
	$(this).toggleClass('active');
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
							toastr.success('New category inserted!');
						}
					})
					.catch(function (error) {
						toastr.options.closeButton = true;
						toastr.warning('Opps!, something went wrong');
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
				new Chart(document.getElementById('line-chart'), {
					type: 'line',
					data: {
						labels: ['Chủ nhật','Thứ 2','Thứ 3','Thứ 4','Thứ 5','Thứ 6','Thứ 7'],
						datasets: [{ 
							data: [data.sunday, data.monday, data.tueDay, data.weDay, data.thuDay, data.friDay, data.satuDay],
							label: 'Biên độ doanh thu',
							borderColor: '#F25C27',
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

const bills = new Vue({
	el : '#bills',
	data : {
		bills : [],
		startDay : null,
		endDay : null,
		byStage : null,
		byStatus : null,
	},
	methods : {
		fill : function(){
			if (this.byStage !== null) {
				if(this.byStage == 'week'){
					axios.get('/admin/bills/week-data')
						.then( (response) => {
							this.bills = response.data;
						})
						.catch(function (error) {
                            throw new error;
						});
				}else {
                    axios.get('/admin/bills/month-data')
                        .then( (response) => {
                            this.bills = response.data;
                        })
                        .catch(function (error) {
                            throw new error;
                        });
                }
			}else if(this.byStatus !== null){
                if(this.byStatus == 'done'){
                    axios.get('/admin/bills/status-data?status=1')
                        .then( (response) => {
                            this.bills = response.data;
                        })
                        .catch(function (error) {
                            throw new error;
                        });
                }   
            }
		}

      
	},
	mounted : function(){
		axios.get('/admin/bills/today-data')
			.then( (response) => {
				this.bills = response.data;
			})
			.catch(function (error) {
                throw new error;
			});
	}
});