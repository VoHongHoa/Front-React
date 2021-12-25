import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./VideoFrame.scss";
class VideoFrame extends Component {
  render() {
    return (
      <div className="section-videoframe">
        <div className="section-header">
          <h1>Tin tức nổi bậc</h1>
        </div>
        <div className="section-content">
          <div className="section-left">
            <iframe
              src="https://www.youtube.com/embed/fjtjs8ABkmw"
              frameborder="1"
              height="440px"
              width="100%"
            ></iframe>
          </div>
          <div className="section-right">
            <div className="videoframe-text">
              Virus corona gây hội chứng hô hấp cấp tính nặng 2, viết tắt
              SARS-CoV-2, trước đây có tên là virus corona mới 2019 (2019-nCoV)
              và cũng được gọi là virus corona ở người 2019, là một chủng
              coronavirus gây ra bệnh viêm đường hô hấp cấp do virus corona
              2019, xuất hiện lần đầu tiên vào tháng 12 năm 2019, trong đợt bùng
              phát đại dịch COVID-19 ở thành phố Vũ Hán, Trung Quốc và bắt đầu
              lây lan nhanh chóng, sau đó trở thành một đại dịch toàn cầu. Vào
              ngày 12 tháng 1 năm 2020, nó được Tổ chức Y tế Thế giới gọi tên là
              2019-nCoV, dựa trên một phương thức đặt tên cho virus corona mới.
              Đến ngày 11 tháng 2 năm 2020, Ủy ban Quốc tế về Phân loại Virus
              (ICTV) quyết định đặt tên chính thức cho chủng virus corona mới
              này là SARS-CoV-2 khi họ phân tích rằng nó cùng loài với virus
              SARS từng gây ra đại dịch năm 2003 nhưng là một chủng khác của
              loài. Virus này là một loại virus corona RNA liên kết đơn chính
              nghĩa. Trong khoảng thời gian đầu của đại dịch COVID-19, các nhân
              viên nghiên cứu đã phát hiện chủng virus này sau khi họ tiến hành
              đo lường kiểm tra axit nucleic và dò tra trình tự bộ gen ở mẫu vật
              lấy từ người bệnh
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoFrame);
