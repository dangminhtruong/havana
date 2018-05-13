const nodemailer = require('nodemailer');
const config = require('../config/config');

var connectionHandle = function (data) {
    const option = {
        service: 'gmail',
        auth: {
            user: config.email.username, // email hoặc username
            pass: config.email.pass // password
        }
    };
    const transporter = nodemailer.createTransport(option);
    let list = '';
    let listItem = data.items.map((item) => {
        list += 
       `
        <tr style="line-height:30px">
            <td style="border:1px solid #cbcbcb">
                <p style="display:block;letter-spacing:.1px;width:200px;font-size:15px;font-weight:300;font-style:normal;font-stretch:normal;line-height:25px;height:25px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">
                    ${item.product_name}
                </p>
            </td>
            <td style="border:1px solid #cbcbcb">${item.quantity}</td>
            <td style="border:1px solid #cbcbcb">
            ${item.price} ₫
            </td>
        </tr>
       `
    });
    let mailContent = `
        <div id=":33q" class="ii gt ">
           <div id=":4ku" class="a3s aXjCH m15e310579e8ece9d">
              <div style="width:598px;padding:20px 20px">
                 <div class="adM">
                 </div>
                 <h1>
                    <a style="display:block;width:30%" href="http://bstore.azurewebsites.com/" target="_blank" data-saferedirecturl="https://www.google.com/url?hl=vi&amp;q=http://bstore.azurewebsites.com/&amp;source=gmail&amp;ust=1517298275281000&amp;usg=AFQjCNFKF3H9k5_CgglHcZYaS2SxcwIGdA">
                    <img style="width:100%;height:auto" src="http://128.199.229.75/images/diamond.jpg" class="CToWUd">
                    </a>
                 </h1>
                 <h3 style="text-align:center;font-size:30px;font-family:sans-serif;color:#424242">Thông báo đặt hàng</h3>
                 <hr>
                 <div style="font-family:sans-serif;color:#616161;font-weight:500;padding-left:5px">
                    <p><strong>Cám ơn quý khách ${ data.user.username } đã đặt hàng tại Diamonds,</strong></p>
                    <p style="line-height:150%">
                       Diamonds xin thông báo đơn hàng của quý khách đã được tiếp nhận và đang trong quá trình xử lý.
                       Diamonds sẽ thông báo đến quý khách ngay khi hàng chuẩn bị được giao.
                    </p>
                    <hr>
                    <h3 style="font-size:25px;font-family:sans-serif;color:#00bfa5;border-bottom:2px solid #00bfa5;padding-bottom:5px;display:inline-block">
                       Chi tiết đơn hàng
                    </h3>
                    <table style="empty-cells:show;border:1px solid #cbcbcb;border-collapse:collapse;border-spacing:0;display:table;margin-bottom:35px">
                       <thead style="background-color:#e0e0e0;color:#000;text-align:left;vertical-align:bottom;border-color:inherit;display:table-header-group">
                          <tr>
                             <td style="padding:0.5em 1em;border:1px solid #cbcbcb;width:200px;text-align:center">Tên sản phẩm</td>
                             <td style="padding:0.5em 1em;border:1px solid #cbcbcb">Số lượng</td>
                             <td style="padding:0.5em 1em;border:1px solid #cbcbcb">Thành tiền</td>
                          </tr>
                       </thead>
                       <tbody style="text-align:center">
                          ${list}
                       </tbody>
                    </table>
                    <hr>
                    <h3 style="font-size:25px;font-family:sans-serif;color:#00bfa5;border-bottom:2px solid #00bfa5;padding-bottom:5px;display:inline-block">
                       Thông tin thanh toán
                    </h3>
                    <p style="margin:0;line-height:170%">Tên khách hàng: <strong>${ data.user.username }</strong></p>
                    <p style="margin:0;line-height:170%">Địa chỉ: <strong>${ data.user.address }</strong></p>
                    <p style="margin:0;line-height:170%">Số điện thoại: <strong>${ data.user.phone }</strong></p>
                    <p style="margin:0;line-height:170%">
                       Tổng số tiền: 
                       <span style="font-weight:700;color:#c62828;font-size:20px">
                       ${data.total}₫
                       </span> 
                       (miễn phí tiền vận chuyển)
                    </p>
                    <p style="margin:0;line-height:170%">
                       Thời gian giao hàng dự kiến: Sau 3 ngày kể từ ngày đặt hàng.
                    </p>
                    <p style="margin:0;line-height:170%">
                        <strong style="color:red"> Quý khách vui lòng nhấn vào 
                            <a href="${ config.domain }/bill/verfi/${ data.billId }" ><b>ĐÂY</b></a> để xác nhận đơn hàng
                        </strong>
                    </p>
                    <hr>
                    <p><strong>Một lần nữa Diamonds Store xin cảm ơn quý khách.</strong></p>
                    <div class="yj6qo"></div>
                    <div class="adL">
                    </div>
                 </div>
                 <div class="adL"></div>
              </div>
              <div class="adL"></div>
           </div>
        </div>
        `;
        let mail = {
            from: 'Diamonds@gmail.com', // Địa chỉ email của người gửi
            to: data.user.email, // Địa chỉ email của người gửi
            subject: 'Submit order mail', // Tiêu đề mail
            text: 'Diamonds.com', // Nội dung mail dạng text
            html: mailContent // Nội dung mail dạng html
        };
        //Tiến hành gửi email
        transporter.sendMail(mail, function(error, info) {
            if (error) { // nếu có lỗi
                console.log(error);
            } else { //nếu thành công
                console.log('Email sent: ' + info.response);
            }
        });
}
module.exports = connectionHandle;
