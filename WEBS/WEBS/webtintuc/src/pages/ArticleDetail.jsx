import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axiosClient from '../api/axiosClient';

const API_BASE_URL = "http://localhost:5001";

// BỘ 15 BÀI BÁO MẪU
const LOCAL_ARTICLES = [
  {
    id: 1,
    title: "Lộ diện công nghệ AI mới của Google năm 2026: Gemini 3 Flash",
    summary: "Gemini 3 Flash vừa ra mắt với khả năng xử lý hình ảnh và video siêu tốc, hỗ trợ lập trình viên tối đa.",
    content: `
      <p>Trong sự kiện công nghệ sáng nay tại California, Google đã chính thức giới thiệu thế hệ AI tiếp theo mang tên Gemini 3 Flash. Đây được xem là bước tiến lớn nhất của gã khổng lồ tìm kiếm trong việc thương mại hóa AI ở quy mô cực lớn, nhắm thẳng vào hiệu năng và tốc độ xử lý.</p>
      <img src="https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2000" style="width:100%; border-radius: 20px; margin: 30px 0; box-shadow: 0 20px 40px rgba(0,0,0,0.1);"/>
      <p>Điểm đáng chú ý nhất là khả năng đọc hiểu code và xử lý video thời gian thực cực nhanh. Với Gemini 3 Flash, lập trình viên có thể yêu cầu AI review toàn bộ repo hàng triệu dòng code chỉ trong vài giây. Các lỗi logic phức tạp hay các lỗ hổng bảo mật tiềm ẩn sẽ được phát hiện ngay lập tức với độ chính xác lên tới 98%, giúp tiết kiệm hàng nghìn giờ làm việc thủ công.</p>
      <h3 style="color: #1e293b; margin-top: 32px;">Cuộc cách mạng trong cộng đồng lập trình</h3>
      <p>Không chỉ dừng lại ở việc fix bug, Gemini 3 còn có khả năng tự động viết unit test và tài liệu hướng dẫn (documentation) cho toàn bộ dự án. Điều này giúp giảm thiểu 40% thời gian phát triển phần mềm, cho phép các startup đưa sản phẩm ra thị trường nhanh hơn bao giờ hết. Hệ thống này cũng được tích hợp sâu vào các IDE phổ biến như VS Code và Cursor, biến nó thành một cộng sự thực thụ thay vì chỉ là một công cụ tra cứu.</p>
      <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000" style="width:100%; border-radius: 20px; margin: 30px 0;"/>
      <p>Ông Sundar Pichai, CEO của Google, khẳng định: "Chúng tôi không chỉ xây dựng một mô hình ngôn ngữ lớn, chúng tôi đang xây dựng một nền tảng trí tuệ có thể hiểu và tương tác với thế giới thực thông qua video và âm thanh theo cách tự nhiên nhất."</p>
      <div style="background: #eff6ff; padding: 24px; border-radius: 16px; border-left: 4px solid #2563eb; margin: 24px 0;">
         <h4 style="margin-top: 0; color: #1d4ed8;">Những thông số ấn tượng của Gemini 3 Flash:</h4>
         <ul style="line-height: 2;">
            <li>Xử lý đa phương thức (hình ảnh, âm thanh, video) đồng thời với độ trễ dưới 50ms.</li>
            <li>Cửa sổ ngữ cảnh lên đến 2 triệu token, tương đương khả năng ghi nhớ toàn bộ mã nguồn của một hệ điều hành nhỏ.</li>
            <li>Tiết kiệm 70% điện năng tiêu thụ, giúp các trung tâm dữ liệu vận hành xanh hơn.</li>
         </ul>
      </div>
    `,
    category: "CÔNG NGHỆ",
    author: "Hoàng Triệu",
    created_at: "2026-04-12 08:30:00",
    image_url: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2000",
    views: 1024
  },
  {
    id: 2,
    title: "Du lịch nội địa bùng nổ: Phú Quốc và Đà Nẵng 'cháy vé' kỳ nghỉ 30/4",
    summary: "Các tour du lịch biển tại Đà Nẵng và Phú Quốc đã cháy vé từ sớm, dự báo một mùa du lịch bội thu cho thị trường trong nước.",
    content: `
      <p>Kỳ nghỉ lễ 30/4 và 1/5 năm nay kéo dài 5 ngày đã tạo điều kiện lý tưởng cho người dân lên kế hoạch du lịch dài ngày. Theo ghi nhận của các hãng hàng không và công ty lữ hành lớn như Vietravel và Saigontourist, lượng khách đặt chỗ đã tăng vọt 150% so với cùng kỳ năm ngoái.</p>
      <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2000" style="width:100%; border-radius: 20px; margin: 30px 0;"/>
      <p>Phú Quốc vẫn giữ vững ngôi vương là điểm đến được săn đón nhất. Công suất phòng tại các khu nghỉ dưỡng cao cấp ven biển đã đạt ngưỡng tối đa. Du khách năm nay không chỉ tắm biển mà còn hào hứng tham gia các hoạt động bảo tồn san hô và trekking rừng quốc gia - một xu hướng du lịch bền vững đang lên ngôi.</p>
      <h3 style="color: #1e293b; margin-top: 32px;">Đà Nẵng - Tâm điểm của những lễ hội rực rỡ</h3>
      <p>Trong khi đó, "thành phố của những cây cầu" Đà Nẵng lại quyến rũ du khách bằng chuỗi Lễ hội Pháo hoa Quốc tế (DIFF) hoành tráng. Các khách sạn dọc sông Hàn đã được đặt kín chỗ từ nhiều tuần trước. Không khí lễ hội bao trùm khắp các nẻo đường, từ các quán ăn hải sản sầm uất đến những bãi cát trắng mịn của biển Mỹ Khê.</p>
      <img src="https://images.unsplash.com/photo-1559592481-74153c49ec18?q=80&w=2000" style="width:100%; border-radius: 20px; margin: 30px 0;"/>
      <blockquote style="border-left: 5px solid #2563eb; padding-left: 20px; font-style: italic; color: #475569; margin: 30px 0;">
        "Chúng tôi đã tăng cường thêm 20 chuyến bay mỗi ngày đến các điểm du lịch trọng điểm nhưng vẫn chưa đủ đáp ứng nhu cầu cực lớn của người dân. Đây thực sự là tín hiệu đáng mừng cho sự phục hồi hoàn toàn của ngành du lịch Việt Nam." - Đại diện một hãng hàng không chia sẻ.
      </blockquote>
      <p>Bên cạnh đó, các địa danh như Hội An, Quy Nhơn và Nha Trang cũng ghi nhận lượng khách tăng đột biến, hứa hẹn một kỳ nghỉ lễ nhộn nhịp và tràn đầy sức sống.</p>
    `,
    category: "DU LỊCH",
    author: "Thành Nghĩa",
    created_at: "2026-04-09 10:00:00",
    image_url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2000",
    views: 120
  },
  {
    id: 3,
    title: "FC Online: Cận cảnh thẻ Ronaldo Nazário +8 nghìn tỷ BP gây rúng động",
    summary: "Thương vụ chuyển nhượng lịch sử với thẻ cầu thủ huyền thoại mùa 24TY đã làm thay đổi hoàn toàn giá trị thị trường game.",
    content: `
      <p>Cộng đồng FC Online Việt Nam vừa trải qua một đêm "không ngủ" khi thị trường chuyển nhượng xuất hiện một siêu phẩm hiếm có: Ronaldo Nazário mùa 24TY (Team of the Year) ở mức thẻ cộng 8. Đây là mức nâng cấp tối đa mà bất kỳ game thủ nào cũng ao ước sở hữu.</p>
      <img src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2000" style="width:100%; border-radius: 20px; margin: 30px 0;"/>
      <p>Thẻ cầu thủ này sở hữu bộ chỉ số "vô lý" với tốc độ, dứt điểm và khả năng rê dắt đều chạm ngưỡng 150. Trong trận đấu, R9 +8 được ví như một "quái vật" thực sự khi có thể một mình vượt qua toàn bộ hàng phòng ngự đối phương và dứt điểm thành bàn ở mọi góc độ. Giá trị giao dịch được ghi nhận lên tới 2.800 tỷ BP, tương đương ngân sách của hàng nghìn đội hình tầm trung cộng lại.</p>
      <h3 style="color: #1e293b; margin-top: 32px;">Sức hút không thể cưỡng lại của mùa thẻ 24TY</h3>
      <p>Sự xuất hiện của thẻ R9 +8 đã tạo nên một làn sóng "đập thẻ" quy mô lớn trong toàn server. Các mặt hàng phôi cầu thủ có chỉ số 115+ đang bị tranh mua gắt gao, khiến thị trường biến động mạnh. Nhiều game thủ chuyên nghiệp cũng thừa nhận rằng việc đối đầu với một đội hình sở hữu R9 +8 là một thử thách tâm lý vô cùng lớn.</p>
      <img src="https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2000" style="width:100%; border-radius: 20px; margin: 30px 0;"/>
      <p>Một streamer nổi tiếng chia sẻ: "Cảm giác điều khiển R9 +8 nó khác bọt hoàn toàn. Mọi pha xử lý đều mượt mà và đẳng cấp đến mức khó tin. Đây thực sự là biểu tượng quyền lực mới trong thế giới FC Online năm nay."</p>
    `,
    category: "GIẢI TRÍ",
    author: "Gamer9x",
    created_at: "2026-04-26 08:15:00",
    image_url: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2000",
    views: 8900
  },
  {
    id: 4,
    title: "Hành trình 'Zero Waste': Lối sống bền vững dẫn dắt tương lai xanh",
    summary: "Khám phá những câu chuyện thực tế về việc giảm rác thải nhựa và cách người trẻ đang thay đổi thế giới từ những hành động nhỏ nhất.",
    content: `
      <p>Lối sống Zero Waste (không rác thải) giờ đây không còn bó hẹp trong các nhóm hoạt động môi trường nhỏ lẻ, mà đã trở thành một triết lý sống được giới trẻ Việt Nam đón nhận nồng nhiệt. Trọng tâm của lối sống này là quy tắc 5R: Refuse (Từ chối), Reduce (Cắt giảm), Reuse (Tái sử dụng), Recycle (Tái chế) và Rot (Phân hủy hữu cơ).</p>
      <img src="https://images.unsplash.com/photo-1542601906970-d4d8153b216d?q=80&w=2000" style="width:100%; border-radius: 20px; margin: 30px 0;"/>
      <p>Tại các khu chung cư hiện đại, phong trào tự làm phân bón hữu cơ từ rác bếp đang nở rộ. Thay vì vứt bỏ vỏ rau củ, người dân ủ chúng thành phân bón cho vườn rau mini trên ban công, tạo nên một vòng tuần hoàn khép kín tuyệt đẹp ngay tại nhà. Điều này không chỉ giúp giảm tải cho các bãi rác mà còn mang lại thực phẩm sạch cho gia đình.</p>
      <h3 style="color: #1e293b; margin-top: 32px;">Từ những cửa hàng 'Refill' đến ý thức cộng đồng</h3>
      <p>Các cửa hàng mô hình "đong đầy" (refill stations) đang xuất hiện ngày càng nhiều tại Hà Nội và TP.HCM. Ở đây, thay vì mua những chai nhựa mới, khách hàng mang theo vỏ chai cũ để đong nước giặt, dầu gội, nước rửa chén. Hành động này giúp tiết kiệm hàng triệu tấn nhựa dùng một lần mỗi năm.</p>
      <img src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=2000" style="width:100%; border-radius: 20px; margin: 30px 0;"/>
      <p>Chị Minh Hòa, một người tiên phong trong lối sống này, tâm sự: "Zero Waste không phải là làm mọi thứ hoàn hảo một mình, mà là hàng triệu người cùng làm những hành động nhỏ một cách không hoàn hảo. Đó mới là sức mạnh thực sự để bảo vệ hành tinh của chúng ta."</p>
    `,
    category: "XÃ HỘI",
    author: "Minh Hòa",
    created_at: "2026-04-26 10:00:00",
    image_url: "https://images.unsplash.com/photo-1542601906970-d4d8153b216d?q=80&w=2000",
    views: 1250
  },
  {
    id: 5,
    title: "Ẩm thực đường phố Sài Gòn: Những câu chuyện kể từ lòng hẻm",
    summary: "Đằng sau những món ăn dân dã là cả một kho tàng văn hóa và lòng hiếu khách đặc trưng của người dân phương Nam.",
    content: `
      <p>Sài Gòn không chỉ đẹp ở những tòa nhà chọc trời, Sài Gòn quyến rũ nhất là khi chiều buông, khi những con hẻm nhỏ bắt đầu lên đèn và mùi thơm của thức ăn lan tỏa khắp các lối đi. Ẩm thực hẻm Sài Gòn là một "đặc sản" mà không một nhà hàng sang trọng nào có thể thay thế được.</p>
      <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2000" style="width:100%; border-radius: 20px; margin: 30px 0;"/>
      <p>Dạo bước trong hẻm, bạn sẽ bắt gặp những cụ già ngồi quạt lò nướng thịt cho món bún chả, tiếng "cạch cạch" quen thuộc của xe hủ tiếu gõ hay khói bốc lên nghi ngút từ nồi bánh canh cua đậm đà. Mỗi món ăn ở đây không chỉ để no bụng, mà còn chứa đựng tâm huyết của những người lao động cần cù, những người đã nuôi sống bao thế hệ người dân thành phố này.</p>
      <h3 style="color: #1e293b; margin-top: 32px;">Hương vị của sự sẻ chia và gắn kết</h3>
      <p>Điểm đặc biệt của ẩm thực đường phố Sài Gòn chính là sự bình đẳng. Tại đây, bạn có thể thấy một nhân viên văn phòng bảnh bao ngồi cạnh một bác xe ôm cùng thưởng thức đĩa cơm tấm đêm. Sự xô bồ, ồn ào nhưng tràn đầy tình người chính là thứ gia vị bí mật làm nên sức hấp dẫn khó cưỡng của ẩm thực nơi đây.</p>
      <img src="https://images.unsplash.com/photo-1555126634-323283e090fa?q=80&w=2000" style="width:100%; border-radius: 20px; margin: 30px 0;"/>
      <p>Dù thành phố có hiện đại đến đâu, những giá trị văn hóa từ lòng hẻm vẫn luôn tồn tại mãnh liệt, như một minh chứng cho sức sống bền bỉ và tâm hồn nồng hậu của người dân Sài Gòn.</p>
    `,
    category: "ĐỜI SỐNG",
    author: "FoodieVN",
    created_at: "2026-04-25 18:00:00",
    image_url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2000",
    views: 5600
  },
  {
    id: 6,
    title: "Khi Âm Nhạc Truyền Thống \"Hồi Sinh\" Trong Tay Nghệ Sĩ Trẻ: Cú Hích Cho Giải Trí Việt",
    summary: "Sự kết hợp độc đáo giữa EDM và tiếng đàn bầu, đàn tranh đang tạo nên một làn sóng mới trong giới trẻ Việt Nam.",
    content: `
      <p>Những năm gần đây, chúng ta chứng kiến sự trỗi dậy mạnh mẽ của các nghệ sĩ trẻ yêu thích âm nhạc truyền thống. Họ không chỉ giữ gìn mà còn biến tấu, kết hợp với các dòng nhạc hiện đại như EDM, Lo-fi hay Hip-hop để tạo ra một ngôn ngữ âm nhạc mới mẻ nhưng vẫn đậm đà bản sắc.</p>
      <img src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2000" style="width:100%; border-radius: 24px; margin: 32px 0; filter: drop-shadow(0 10px 20px rgba(0,0,0,0.1));"/>
      <p>Nghệ sĩ đàn tranh Nguyễn Bảo Lan chia sẻ: "Chúng mình muốn chứng minh rằng nhạc cụ dân tộc không hề lỗi thời. Nó có thể rất 'cool' và bắt tai nếu biết cách khai thác". Sự kết hợp này không chỉ làm mới âm nhạc dân tộc mà còn giúp tiếp cận được đối tượng khán giả Gen Z vốn chuộng sự mới lạ và sáng tạo. Những giai điệu léo lắt của đàn tranh khi đặt trên nền bass dồn dập của Trap đã tạo nên một hiệu ứng thính giác vô cùng bùng nổ.</p>
      <h3 style="color: #1e293b; margin-top: 32px;">Đưa văn hóa Việt vươn tầm quốc tế</h3>
      <p>Nhiều dự án âm nhạc sử dụng chất liệu dân gian như quan họ, hát xoan hay chèo kết hợp với các nhà sản xuất quốc tế đã đạt được những thành công vang dội trên các nền tảng streaming toàn cầu. Điều này chứng minh rằng "càng dân tộc thì càng quốc tế", và những giá trị truyền thống nếu được thổi hồn bằng tư duy hiện đại sẽ có sức sống vô cùng mãnh liệt.</p>
      <img src="https://images.unsplash.com/photo-1514525253361-b83f85973c0?q=80&w=2000" style="width:100%; border-radius: 20px; margin: 30px 0;"/>
      <div style="background: #f8fafc; padding: 24px; border-radius: 16px; border-left: 4px solid #2563eb; margin: 24px 0;">
         <h4 style="margin-top: 0; color: #2563eb;">Những dự án tiêu biểu trong năm 2026:</h4>
         <ul style="line-height: 2;">
            <li>Album "Tiếng Vọng Ngàn Đời": Kết hợp đàn bầu và nhạc điện tử Ambient.</li>
            <li>Tour lưu diễn "Sắc Việt": Mang nhạc cụ dân tộc trình diễn tại các lễ hội âm nhạc lớn ở Châu Âu.</li>
            <li>Dự án số hóa âm thanh các nhạc cụ hiếm gặp của 54 dân tộc anh em.</li>
         </ul>
      </div>
      <p>Đây thực sự là một cú hích cần thiết cho nền giải trí Việt Nam, giúp đưa văn hóa truyền thống đi xa hơn trong kỷ nguyên số, nơi mà bản sắc chính là vũ khí cạnh tranh mạnh mẽ nhất.</p>
    `,
    category: "GIẢI TRÍ",
    author: "Thành Nghĩa",
    created_at: "2026-04-26 09:30:00",
    image_url: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2000",
    views: 3400
  },
  {
    id: 7,
    title: "\"Khoảng trống\" kỹ năng mềm: Thách thức lớn cho sinh viên mới ra trường",
    summary: "Nghiên cứu mới nhất cho thấy hơn 70% sinh viên tốt nghiệp đáp ứng được kiến thức chuyên môn nhưng lại lúng túng trong giao tiếp và làm việc nhóm.",
    content: `
      <p>Trong bối cảnh thị trường lao động năm 2026 đầy biến động, tấm bằng đại học loại giỏi dường như là chưa đủ. Các nhà tuyển dụng hiện nay không chỉ tìm kiếm những "cỗ máy giải thuật" mà họ khao khát những cá nhân có khả năng thích nghi, giao tiếp và giải quyết vấn đề một cách tinh tế.</p>
      <img src="https://images.unsplash.com/photo-1523240715639-93f8fd0a9840?q=80&w=2000" style="width:100%; border-radius: 20px; margin: 30px 0; box-shadow: 0 20px 40px rgba(0,0,0,0.1);"/>
      <p>Tại các hội chợ việc làm lớn ở Hà Nội và TP.HCM, không khó để bắt gặp những gương mặt ưu tú với bảng điểm "khủng" nhưng lại tỏ ra rụt rè khi đối diện với các câu hỏi tình huống từ bộ phận nhân sự. "Các em nắm rất chắc lý thuyết, nhưng khi yêu cầu thuyết trình về một ý tưởng mới hoặc xử lý xung đột trong nhóm, nhiều em hoàn toàn bị động," đại diện một tập đoàn công nghệ đa quốc gia chia sẻ.</p>
      <h3 style="color: #1e293b; margin-top: 32px;">Lỗ hổng từ ghế nhà trường?</h3>
      <p>Nhiều chuyên gia giáo dục cho rằng chương trình học hiện tại vẫn đang quá nặng về lý thuyết hàn lâm mà thiếu đi các giờ thực hành kỹ năng thực tế. Sinh viên dành hàng nghìn giờ trên giảng đường để nghe giảng nhưng lại có rất ít cơ hội để rèn luyện kỹ năng đàm phán, quản lý thời gian hay tư duy phản biện - những thứ thực sự quyết định sự thành bại trong môi trường công sở chuyên nghiệp.</p>
      <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2000" style="width:100%; border-radius: 20px; margin: 30px 0;"/>
      <p>Tuy nhiên, không thể đổ lỗi hoàn toàn cho hệ thống giáo dục. Sự chủ động của sinh viên đóng vai trò then chốt. Việc tham gia các câu lạc bộ, các hoạt động ngoại khóa hay đi làm thêm từ sớm chính là "lò luyện" tốt nhất để các bạn trẻ lấp đầy những khoảng trống này trước khi chính thức bước chân vào thị trường lao động khốc liệt.</p>
      <div style="background: #fff7ed; padding: 24px; border-radius: 16px; border-left: 4px solid #f97316; margin: 24px 0;">
         <h4 style="margin-top: 0; color: #c2410c;">5 kỹ năng "vàng" sinh viên cần trang bị ngay:</h4>
         <ul style="line-height: 2;">
            <li>Kỹ năng giao tiếp và truyền đạt ý tưởng hiệu quả.</li>
            <li>Tư duy giải quyết vấn đề sáng tạo (Problem Solving).</li>
            <li>Khả năng làm việc nhóm và quản trị xung đột.</li>
            <li>Quản lý thời gian và chịu được áp lực cao.</li>
            <li>Kỹ năng tự học và thích nghi với công nghệ mới (AI, Automation).</li>
         </ul>
      </div>
      <p>Cuối cùng, hãy nhớ rằng kỹ năng mềm không phải là thứ có thể học được chỉ qua sách vở. Nó là kết quả của một quá trình rèn luyện, va vấp và đúc kết kinh nghiệm bền bỉ mỗi ngày.</p>
    `,
    category: "XÃ HỘI",
    author: "Hoàng Triệu",
    created_at: "2026-04-12 12:00:00",
    image_url: "https://images.unsplash.com/photo-1523240715639-93f8fd0a9840?q=80&w=2000",
    views: 3100
  },
  {
    id: 8,
    title: "Vàng thế giới vượt đỉnh lịch sử: Tâm lý nhà đầu tư Việt đang ở đâu?",
    summary: "Giá vàng biến động mạnh trước những biến số kinh tế toàn cầu khiến tài sản an toàn trở nên đắt đỏ hơn bao giờ hết.",
    content: `
      <p>Giá vàng trong nước và thế giới vừa ghi nhận những phiên giao dịch đầy biến động, phá vỡ mọi kỷ lục từ trước đến nay. Việc các ngân hàng trung ương trên thế giới, đặc biệt là tại châu Á, liên tục tăng dự trữ vàng đã tạo ra một lực đẩy khổng lồ lên giá kim loại quý này.</p>
      <img src="https://images.unsplash.com/photo-1610375461246-83df859d849d?q=80&w=2000" style="width:100%; border-radius: 20px; margin: 30px 0;"/>
      <p>Tại Việt Nam, tâm lý người dân đang chuyển dịch mạnh mẽ từ gửi tiết kiệm sang tích trữ vàng miếng. Các cửa hàng vàng lớn luôn trong tình trạng đông đúc, thậm chí nhiều nơi phải giới hạn số lượng mua mỗi người để đảm bảo nguồn cung. Điều này cho thấy niềm tin vào các kênh đầu tư truyền thống khác như chứng khoán hay bất động sản đang có dấu hiệu lung lay trước những biến động khó lường của kinh tế vĩ mô.</p>
      <h3 style="color: #1e293b; margin-top: 32px;">Lời khuyên cho nhà đầu tư cá nhân</h3>
      <p>Các chuyên gia tài chính khuyến cáo: Dù vàng là kênh trú ẩn an toàn, nhưng việc "tất tay" vào vàng ở thời điểm giá đang ở vùng đỉnh là cực kỳ rủi ro. Nhà đầu tư nên duy trì một danh mục đa dạng để cân bằng lợi nhuận và rủi ro.</p>
      <img src="https://images.unsplash.com/photo-1589758438368-0ad531db3366?q=80&w=2000" style="width:100%; border-radius: 20px; margin: 30px 0;"/>
      <p>Dự báo giá vàng sẽ còn chịu ảnh hưởng lớn từ các báo cáo lạm phát và chính sách lãi suất của các cường quốc kinh tế trong thời gian tới.</p>
    `,
    category: "KINH TẾ",
    author: "Tòa Soạn",
    created_at: "2026-04-12 07:00:00",
    image_url: "https://images.unsplash.com/photo-1610375461246-83df859d849d?q=80&w=2000",
    views: 4500
  },
  {
    id: 9,
    title: "Nâng tầm phong cách Streetwear cho nam giới có chiều cao vượt trội",
    summary: "Bí quyết phối đồ thông minh giúp các chàng trai cao trên 1m80 luôn nổi bật và cân đối trong mọi hoàn cảnh.",
    content: `
      <p>Sở hữu chiều cao 1m80 là một món quà của tạo hóa, nhưng nếu không biết cách phối đồ, bạn sẽ dễ rơi vào tình trạng trông lêu nghêu và thiếu sự tinh tế. Trong năm 2026, phong cách Streetwear đã tiến hóa để tôn vinh những vóc dáng cao ráo bằng những quy tắc về tỷ lệ và Layering.</p>
      <img src="https://images.unsplash.com/photo-1520975661595-6453be3f7070?q=80&w=2000" style="width:100%; border-radius: 20px; margin: 30px 0;"/>
      <p>Quy tắc vàng đầu tiên là: Tránh xa những bộ đồ quá ôm sát. Đồ Skinny sẽ chỉ khiến đôi chân của bạn trông dài một cách kỳ quặc. Hãy thay thế bằng quần Baggy hoặc quần ống rộng (Wide-leg pants) để tạo ra sự cân bằng về khối lượng. Các mẫu áo khoác Oversize hoặc áo Bomber có độ phồng nhẹ cũng là trợ thủ đắc lực giúp phần thân trên trông dày dặn hơn.</p>
      <h3 style="color: #1e293b; margin-top: 32px;">Layering - Nghệ thuật phối nhiều lớp</h3>
      <p>Phối một chiếc áo thun dài hơn một chút bên dưới chiếc áo Hoodie hoặc áo sơ mi khoác ngoài sẽ giúp phá vỡ các đường thẳng dài trên cơ thể, tạo ra sự ngắt quãng cần thiết để mắt người nhìn cảm thấy hài hòa hơn. Đừng quên các phụ kiện như mũ Beanie hay túi đeo chéo để tạo thêm điểm nhấn phong cách.</p>
      <img src="https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?q=80&w=2000" style="width:100%; border-radius: 20px; margin: 30px 0;"/>
      <p>Cuối cùng, một đôi giày Sneaker "hầm hố" với phần đế cao vừa phải sẽ giúp hoàn thiện vẻ ngoài bụi bặm nhưng vẫn cực kỳ thời thượng của bạn.</p>
    `,
    category: "ĐỜI SỐNG",
    author: "Fashionista",
    created_at: "2026-04-11 09:15:00",
    image_url: "https://images.unsplash.com/photo-1520975661595-6453be3f7070?q=80&w=2000",
    views: 280
  },
  {
    id: 10,
    title: "Thị trường xe điện Việt Nam: Khi hạ tầng sạc là chìa khóa của cuộc chơi",
    summary: "Các trạm sạc đang phủ kín mọi nẻo đường, xóa tan nỗi lo 'hết pin giữa chừng' của người dùng xe xanh.",
    content: `
      <p>Xe điện (EV) không còn là một khái niệm xa lạ mà đã chính thức trở thành thực tế của giao thông Việt Nam năm 2026. Tuy nhiên, yếu tố quyết định sự thắng bại của các hãng xe không chỉ nằm ở thiết kế hay công suất máy, mà nằm ở hệ thống trạm sạc.</p>
      <img src="https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=2000" style="width:100%; border-radius: 20px; margin: 30px 0;"/>
      <p>Hiện nay, các trạm sạc siêu nhanh đã có mặt tại hầu hết các trung tâm thương mại lớn, bãi đỗ xe và cả những trạm dừng chân trên các tuyến cao tốc huyết mạch. Việc sạc đầy 80% pin chỉ trong vòng 20 phút - tương đương thời gian một lần nghỉ uống cà phê - đã khiến việc sở hữu xe điện trở nên thuận tiện hơn bao giờ hết.</p>
      <h3 style="color: #1e293b; margin-top: 32px;">Công nghệ pin thể rắn và bước ngoặt mới</h3>
      <p>Bên cạnh hạ tầng, công nghệ pin cũng có những bước tiến nhảy vọt. Các dòng xe thế hệ mới sử dụng pin thể rắn cho phép quãng đường di chuyển lên đến 800km cho một lần sạc, giúp xóa bỏ hoàn toàn nỗi lo lắng về khoảng cách đối với những chuyến du lịch xuyên Việt.</p>
      <img src="https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2000" style="width:100%; border-radius: 20px; margin: 30px 0;"/>
      <p>Với sự hỗ trợ mạnh mẽ về thuế và các chính sách ưu đãi cho phương tiện không phát thải từ chính phủ, xe điện đang dần thay thế hoàn toàn xe động cơ đốt trong tại các đô thị lớn.</p>
    `,
    category: "THỊ TRƯỜNG",
    author: "Admin",
    created_at: "2026-04-10 16:45:00",
    image_url: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=2000",
    views: 1900
  },

  {
    id: 11,
    title: "Đêm nhạc hội TP.HCM: Khi âm nhạc xóa nhòa mọi khoảng cách",
    summary: "Hàng nghìn khán giả đã cháy hết mình cùng dàn sao quốc tế và Việt Nam trong một đêm đại nhạc hội không ngủ.",
    content: `
      <p>Hàng nghìn ánh đèn flash từ điện thoại đã thắp sáng cả một vùng trời tại Sân vận động Quân khu 7 trong đêm qua. Đây không chỉ là một buổi biểu diễn ca nhạc thông thường, đó là một lễ hội âm thanh và ánh sáng thực thụ, nơi những tâm hồn yêu nhạc được hòa làm một.</p>
      <img src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2000" style="width:100%; border-radius: 20px; margin: 30px 0;"/>
      <p>Dàn line-up năm nay được đánh giá là "khủng" nhất trong thập kỷ qua với sự góp mặt của những DJ hàng đầu thế giới và các ban nhạc Rock đình đám của Việt Nam. Sự kết hợp giữa các thể loại nhạc khác nhau từ EDM sôi động, Rap cá tính đến Indie sâu lắng đã làm hài lòng cả những khán giả khó tính nhất. Hệ thống loa L-Acoustics thế hệ mới đã mang đến những trải nghiệm âm thanh chân thực đến từng nhịp bass.</p>
      <h3 style="color: #1e293b; margin-top: 32px;">Cảm xúc bùng nổ bất chấp thời tiết</h3>
      <p>Nhiều bạn trẻ từ các tỉnh lân cận đã đổ về TP.HCM từ rất sớm để giữ chỗ. Bất chấp cơn mưa bất chợt giữa chương trình, sự nhiệt huyết của đám đông không hề giảm sút. Tất cả đã cùng hòa vang tiếng hát trong những bản ballad quen thuộc, tạo nên một khoảnh khắc kỳ diệu khi hàng vạn người cùng chung một nhịp đập trái tim.</p>
      <img src="https://images.unsplash.com/photo-1459749411177-042180ec75fa?q=80&w=2000" style="width:100%; border-radius: 20px; margin: 30px 0;"/>
      <p>Lễ hội kết thúc bằng màn trình diễn pháo hoa Mapping 3D hoành tráng, để lại dư âm khó quên trong lòng người hâm mộ âm nhạc tại thành phố mang tên Bác. Ban tổ chức cũng cam kết sẽ biến đây thành một sự kiện thường niên mang tầm cỡ khu vực.</p>
    `,
    category: "GIẢI TRÍ",
    author: "Thành Nghĩa",
    created_at: "2026-04-12 20:00:00",
    image_url: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2000",
    views: 304
  },
  {
    id: 12,
    title: "Khởi nghiệp xanh: Lối đi mới đầy tiềm năng cho Startup Việt năm 2026",
    summary: "Kinh doanh không chỉ là lợi nhuận, mà còn là trách nhiệm với hành tinh xanh thông qua các mô hình kinh tế tuần hoàn.",
    content: `
      <p>Năm 2026 chứng kiến một làn sóng khởi nghiệp mới vô cùng tích cực: "Khởi nghiệp xanh". Thay vì chạy theo những mô hình thương mại điện tử truyền thống, các bạn trẻ Gen Z đang tập trung vào việc giải quyết những thách thức về môi trường thông qua tư duy kinh doanh sáng tạo.</p>
      <img src="https://images.unsplash.com/photo-1473186578172-c141e6798cf4?q=80&w=2000" style="width:100%; border-radius: 20px; margin: 30px 0;"/>
      <p>Từ những dự án sản xuất bao bì từ sợi nấm, đến các ứng dụng AI tối ưu hóa lộ trình thu gom rác thải công nghiệp, các startup Việt đang nhận được sự quan tâm rất lớn từ các quỹ đầu tư mạo hiểm quốc tế (Venture Capital). Điều này cho thấy tiềm năng to lớn của thị trường các sản phẩm thân thiện với môi trường tại khu vực Đông Nam Á.</p>
      <h3 style="color: #1e293b; margin-top: 32px;">Thách thức về nguồn vốn và công nghệ</h3>
      <p>Mặc dù tiềm năng lớn, các startup xanh vẫn phải đối mặt với không ít thách thức, đặc biệt là về chi phí nghiên cứu và phát triển (R&D) ban đầu. Tuy nhiên, với sự hỗ trợ từ các chính sách ưu đãi thuế của chính phủ và lòng tin ngày càng tăng của người tiêu dùng, con đường phía trước đang trở nên rộng mở hơn bao giờ hết.</p>
      <img src="https://images.unsplash.com/photo-1542601098-3ade3a4d929e?q=80&w=2000" style="width:100%; border-radius: 20px; margin: 30px 0;"/>
      <p>Người tiêu dùng hiện đại không chỉ quan tâm đến giá cả, họ quan tâm đến giá trị cốt lõi và tác động của sản phẩm đối với thế giới xung quanh. Đây chính là động lực lớn nhất để các startup xanh kiên trì với con đường mình đã chọn.</p>
    `,
    category: "KINH TẾ",
    author: "Minh Hòa",
    created_at: "2026-04-12 14:00:00",
    image_url: "https://images.unsplash.com/photo-1473186578172-c141e6798cf4?q=80&w=2000",
    views: 156
  },
  {
    id: 13,
    title: "Lập trình viên trong kỷ nguyên AI: Thay đổi tư duy để không bị bỏ lại phía sau",
    summary: "AI đang định nghĩa lại cách chúng ta viết code, biến lập trình viên thành những 'kiến trúc sư' thực thụ.",
    content: `
      <p>Cơn bão AI đã tràn qua ngành công nghiệp phần mềm với tốc độ chóng mặt. Những công việc lặp đi lặp lại như viết mã boilerplate, unit test cơ bản đã được AI đảm nhận hoàn hảo. Câu hỏi đặt ra là: Lập trình viên con người sẽ đứng ở đâu trong bức tranh này?</p>
      <img src="https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=2000" style="width:100%; border-radius: 20px; margin: 30px 0;"/>
      <p>Năm 2026, kỹ năng quan trọng nhất của một developer không còn là thuộc lòng cú pháp ngôn ngữ, mà là khả năng tư duy hệ thống và "giao tiếp" hiệu quả với các công cụ AI. Việc nắm vững kỹ thuật Prompt Engineering và hiểu rõ kiến trúc phần mềm giúp lập trình viên điều khiển AI tạo ra những hệ thống phức tạp với tốc độ gấp 10 lần trước đây.</p>
      <h3 style="color: #1e293b; margin-top: 32px;">Tư duy giải quyết vấn đề là chìa khóa</h3>
      <p>Các doanh nghiệp hiện nay đang săn đón những lập trình viên có khả năng nhìn thấy bức tranh lớn, biết cách tối ưu hóa trải nghiệm người dùng và đảm bảo tính bảo mật cho hệ thống. AI có thể viết code, nhưng AI chưa thể hiểu sâu sắc về nhu cầu kinh doanh và cảm xúc của người dùng cuối.</p>
      <img src="https://images.unsplash.com/photo-1517134191118-9d595e4c8c2b?q=80&w=2000" style="width:100%; border-radius: 20px; margin: 30px 0;"/>
      <p>Vì vậy, hãy coi AI là một trợ lý đắc lực, một "junior developer" siêu tốc độ. Hãy tập trung vào việc rèn luyện tư duy phản biện và khả năng sáng tạo - những thứ sẽ mãi mãi là tài sản riêng của con người.</p>
    `,
    category: "CÔNG NGHỆ",
    author: "Hoàng Triệu",
    created_at: "2026-04-12 16:30:00",
    image_url: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=2000",
    views: 86
  },
  {
    id: 14,
    title: "Khám phá phong cách sống tương lai tại các căn hộ thông minh Thủ Thiêm",
    summary: "Khi công nghệ không chỉ là tiện ích, mà là một phần tất yếu của không gian sống hiện đại và an toàn.",
    content: `
      <p>Khu đô thị mới Thủ Thiêm đang dần trở thành biểu tượng cho phong cách sống hiện đại và đẳng cấp bậc nhất Đông Nam Á. Tại đây, những căn hộ "Smart Home" thế hệ mới không chỉ dừng lại ở việc điều khiển từ xa, mà còn được tích hợp sâu với trí tuệ nhân tạo để hiểu thấu mọi thói quen của gia chủ.</p>
      <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2000" style="width:100%; border-radius: 20px; margin: 30px 0; box-shadow: 0 20px 40px rgba(0,0,0,0.1);"/>
      <p>Hãy tưởng tượng, ngay khi bạn vừa bước chân vào sảnh, hệ thống nhận diện khuôn mặt đã tự động gọi thang máy đưa bạn lên đúng tầng nhà mình. Cửa căn hộ mở ra với nhiệt độ máy lạnh đã được điều chỉnh ở mức 24 độ C lý tưởng, rèm cửa từ từ kéo ra để bạn có thể ngắm trọn view sông Sài Gòn thơ mộng trong ánh hoàng hôn. Mọi thứ đều được tự động hóa hoàn hảo nhờ hệ thống cảm biến môi trường thông minh.</p>
      <h3 style="color: #1e293b; margin-top: 32px;">An ninh đa lớp và sự riêng tư tuyệt đối</h3>
      <p>Bên cạnh sự tiện nghi, yếu tố an ninh luôn được đặt lên hàng đầu. Với hệ thống an ninh đa lớp sử dụng AI, bất kỳ sự xâm nhập trái phép nào cũng sẽ được cảnh báo ngay lập tức về điện thoại của chủ nhà và trung tâm điều hành tòa nhà. Robot tuần tra tự động cũng được triển khai tại các khu vực công cộng để đảm bảo an toàn 24/7 cho cư dân.</p>
      <img src="https://images.unsplash.com/photo-1558002038-1055907df8d7?q=80&w=2000" style="width:100%; border-radius: 20px; margin: 30px 0;"/>
      <p>Smart Home Thủ Thiêm không chỉ là một ngôi nhà, đó là một người quản gia tận tụy, giúp cuộc sống của bạn trở nên đơn giản, an toàn và tinh tế hơn mỗi ngày. Đây chính là chuẩn mực mới cho không gian sống của những cư dân tinh hoa trong kỷ nguyên số.</p>
    `,
    category: "BẤT ĐỘNG SẢN",
    author: "Admin",
    created_at: "2026-04-11 11:00:00",
    image_url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2000",
    views: 420
  },
  {
    id: 15,
    title: "Hà Giang - Mùa đá nở hoa: Hành trình tìm lại chính mình trên những cung đường huyền thoại",
    summary: "Vẻ đẹp hùng vĩ của cao nguyên đá và tấm lòng nồng hậu của đồng bào vùng cao sẽ khiến bạn say lòng ngay từ lần đầu đặt chân đến.",
    content: `
      <p>Người ta nói rằng, ai cũng nên đến Hà Giang ít nhất một lần trong đời. Không phải chỉ để ngắm cảnh, mà để thấy mình nhỏ bé trước sự kỳ vĩ của thiên nhiên và thấy trái tim mình ấm lại trước nụ cười hồn nhiên của những đứa trẻ vùng cao giữa mây trời cực Bắc.</p>
      <img src="https://images.unsplash.com/photo-1502101872923-d48509bff386?q=80&w=2000" style="width:100%; border-radius: 20px; margin: 30px 0; box-shadow: 0 20px 40px rgba(0,0,0,0.1);"/>
      <p>Cung đường Mã Pí Lèng - một trong "tứ đại đỉnh đèo" của miền Bắc - luôn mang lại những cảm xúc mãnh liệt cho bất kỳ ai cầm lái. Phóng tầm mắt từ trên cao, dòng sông Nho Quế xanh ngắt như dải lụa lục bảo uốn lượn giữa những vách đá tai mèo dựng đứng. Cái cảm giác gió mây vờn quanh tóc và mùi hương của núi rừng phả vào cánh mũi là thứ trải nghiệm mà không một thước phim nào có thể lột tả hết được.</p>
      <h3 style="color: #1e293b; margin-top: 32px;">Những bản làng mộc mạc và chân tình</h3>
      <p>Dừng chân tại Lũng Cú hay Đồng Văn, bạn sẽ được hòa mình vào không khí của những phiên chợ lùi đầy màu sắc. Hãy thử một lần thưởng thức bát thắng cố nóng hổi bên bếp lửa bập bùng và nghe tiếng khèn Mông vang vọng giữa không trung bao la. Bạn sẽ hiểu vì sao mảnh đất cằn cỗi này lại có thể nuôi dưỡng những tâm hồn phóng khoáng và kiên cường đến thế.</p>
      <img src="https://images.unsplash.com/photo-1505993597083-3bd19fb75e57?q=80&w=2000" style="width:100%; border-radius: 20px; margin: 30px 0;"/>
      <p>Hà Giang không dành cho những người vội vã. Hãy đi chậm lại, để cảm nhận từng nhịp thở của núi rừng, để thấy "đá cũng nở hoa" và để thấy yêu thêm mảnh đất địa đầu Tổ quốc thiêng liêng này. Mỗi mùa, Hà Giang lại mang một màu áo mới: sắc trắng của hoa lê, sắc hồng của tam giác mạch hay sắc vàng óng ả của những ruộng bậc thang mùa lúa chín.</p>
    `,
    category: "XÃ HỘI",
    author: "Tuấn Anh",
    created_at: "2026-04-10 08:00:00",
    image_url: "https://images.unsplash.com/photo-1502101872923-d48509bff386?q=80&w=2000",
    views: 950
  },

];


// BÌNH LUẬN CÓ NGƯỜI TRẢ LỜI
const LOCAL_COMMENTS = [
  {
    id: 1,
    user_name: "Độ Phùng",
    content: "Bài viết này thực sự rất hữu ích cho những sinh viên năm cuối như mình. Đặc biệt là phần phân tích về lộ trình học Full-stack. Mình đang phân vân giữa việc tập trung vào Next.js hay học sâu hơn về NestJS, đọc xong thấy thông não hẳn!",
    created_at: "2026-04-12 09:30",
    replies: [
      {
        id: 101,
        user_name: "Hoàng Triệu",
        content: "Cảm ơn anh Độ đã ủng hộ! Theo em thì cứ vững React trước rồi qua NextJS là đẹp nhất ạ.",
        created_at: "2026-04-12 10:00"
      },
      {
        id: 102,
        user_name: "Thành Nghĩa",
        content: "Em cũng đang cày NestJS đây, công nhận cấu trúc nó chặt chẽ thật.",
        created_at: "2026-04-12 10:15"
      }
    ]
  }, // <--- PHẢI CÓ DẤU PHẨY Ở ĐÂY
  {
    id: 2,
    user_name: "Minh Hòa",
    content: "Kinh nghiệm cho bạn nào decor phòng bằng pallet là phải mua loại đã bào nhẵn và xử lý chống mối mọt nhé, không là đêm nằm nghe tiếng 'rắc rắc' vui tai lắm.",
    created_at: "2026-04-12 11:20",
    replies: [
      {
        id: 201,
        user_name: "Nội Thất Xinh",
        content: "Đúng rồi ạ, bên mình luôn khuyến khích khách hàng sơn thêm một lớp lót bóng nữa.",
        created_at: "2026-04-12 11:45"
      }
    ]
  }, // <--- VÀ Ở ĐÂY NỮA
  {
    id: 3,
    user_name: "Gamer9x",
    content: "Vừa xem clip review con Ronaldo +8 này, sút góc nào cũng vào, thật là điên rồ!",
    created_at: "2026-04-12 11:00",
    replies: [
      { id: 301, user_name: "Admin", content: "Chỉ mong được sờ vào em nó một lần trong game thôi bạn ơi!", created_at: "2026-04-12 11:30" }
    ]
  },
  {
    id: 4,
    user_name: "FrontEnd_Dev",
    content: "ShadcnUI đúng là cứu cánh cho những đứa lười làm UI như mình. Năm 2026 rồi mà không biết cái này thì đúng là tụt hậu.",
    created_at: "2026-04-12 12:15",
    replies: [
      { id: 401, user_name: "Hoàng Triệu", content: "Chuẩn luôn bác, kết hợp với Framer Motion nữa thì web mượt khỏi bàn.", created_at: "2026-04-12 12:45" }
    ]
  }
  // Bạn có thể thêm các comment khác vào đây, nhớ dấu phẩy giữa các dấu { } là được!
];

// --- HÀM TẠO BÌNH LUẬN NGẪU NHIÊN CHO TÒA SOẠN ---
const generateRandomComments = () => {
    const names = ["Minh Tuấn", "Thu Hà", "Thành Vinh", "Hoàng Nam", "Bảo Châu", "Gia Khiêm", "Vân Anh", "Quốc Bảo", "Mai Phương", "Đức Huy", "Ngọc Diệp", "Hữu Phước"];
    const phrases = [
        "Bài viết rất hay, cảm ơn tác giả đã chia sẻ thông tin kịp thời!",
        "Thông tin rất hữu ích, mình đã học được nhiều điều mới từ vấn đề này.",
        "Mong có thêm nhiều bài viết phân tích sâu như thế này nữa.",
        "Rất đúng với tình hình thực tế hiện nay, cảm ơn tòa soạn.",
        "Cần thêm nhiều góc nhìn đa chiều hơn về vấn đề này, nhưng dù sao bài viết cũng rất tốt.",
        "Tuyệt vời, thiết kế giao diện web xem tin tức này đẹp và mượt quá!",
        "Mình rất thích cách trình bày hình ảnh và nội dung của trang báo này.",
        "Thông tin chính xác và rất nhanh nhạy.",
        "Một góc nhìn rất thú vị, mình sẽ chia sẻ bài viết này cho bạn bè.",
        "Đúng là xu hướng công nghệ năm 2026 có khác, quá ấn tượng!",
        "Hà Giang mùa này đẹp thật, đọc bài lại muốn xách ba lô lên và đi.",
        "Hy vọng thị trường sẽ sớm ổn định lại như bài viết dự báo."
    ];
    
    const count = Math.floor(Math.random() * 4) + 3; // Tạo 3 đến 6 comment
    const shuffledNames = [...names].sort(() => 0.5 - Math.random());
    const shuffledPhrases = [...phrases].sort(() => 0.5 - Math.random());
    
    return Array.from({ length: count }).map((_, i) => ({
        id: Date.now() + i,
        user_name: shuffledNames[i],
        content: shuffledPhrases[i],
        created_at: `${Math.floor(Math.random() * 23)} giờ trước`,
        replies: Math.random() > 0.7 ? [{
            id: Date.now() + 100 + i,
            user_name: "Admin",
            content: "Cảm ơn bạn đã quan tâm và để lại ý kiến đóng góp cho tòa soạn!",
            created_at: "Vừa xong"
        }] : []
    }));
};

function ArticleDetail() {
  const { id } = useParams();
  const navigate = useNavigate(); 
  
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userToken, setUserToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
  const [toastMessage, setToastMessage] = useState("");
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      setScrollProgress((currentScroll / totalScroll) * 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (article) {
      const savedArticles = JSON.parse(localStorage.getItem('saved_articles') || '[]');
      setIsSaved(savedArticles.some(item => String(item.id) === String(article.id)));
    }
  }, [article]);

  const handleSaveArticle = () => {
    if (!userToken) {
      showToast("🔒 Vui lòng đăng nhập để lưu bài viết!");
      return;
    }
    const savedArticles = JSON.parse(localStorage.getItem('saved_articles') || '[]');
    if (isSaved) {
      const newSaved = savedArticles.filter(item => String(item.id) !== String(article.id));
      localStorage.setItem('saved_articles', JSON.stringify(newSaved));
      setIsSaved(false);
      showToast("Đã bỏ lưu bài viết");
    } else {
      savedArticles.unshift({
        id: article.id,
        title: article.title,
        category: article.category,
        image_url: article.image_url,
        summary: article.summary,
        created_at: article.created_at
      });
      localStorage.setItem('saved_articles', JSON.stringify(savedArticles));
      setIsSaved(true);
      showToast("Đã lưu bài viết vào hồ sơ cá nhân");
    }
  };

  useEffect(() => {
    if (id) {
        axiosClient.put(`/news/${id}/view`).catch(() => {});
    }
  }, [id]);

  useEffect(() => {
    const fetchArticleDetail = async () => {
      setLoading(true);
      try {
        const res = await axiosClient.get(`/news/${id}`);
        const data = Array.isArray(res) ? res[0] : (res.data || res);
        
        if (data && (data.id || data.id === 0)) {
          // Lấy nội dung dự phòng nếu API không có nội dung dài
          const fallback = LOCAL_ARTICLES.find(item => String(item.id) === String(id));
          
          setArticle({
            ...data,
            // Ưu tiên content cục bộ nếu content từ API quá ngắn hoặc không có
            content: (data.content && data.content.length > 200) ? data.content : (fallback?.content || data.content),
            // Ưu tiên hình ảnh cục bộ nếu hình ảnh API là placeholder
            image_url: (data.image_url && !data.image_url.includes('placeholder')) ? data.image_url : (fallback?.image_url || data.image_url)
          });

          // NẾU KHÔNG CÓ BÌNH LUẬN -> TẠO NGẪU NHIÊN ĐỂ UI ĐẸP HƠN
          if (Array.isArray(data.comments) && data.comments.length > 0) {
            setComments(data.comments);
          } else {
            setComments(generateRandomComments());
          }

        } else {
          throw new Error("API trống");
        }
      } catch (err) {
        console.warn("Dùng dữ liệu dự phòng cho bài viết ID:", id);
        const fallback = LOCAL_ARTICLES.find(item => String(item.id) === String(id));
        setArticle(fallback || LOCAL_ARTICLES[0]);
        setComments(generateRandomComments()); // Dùng comment ngẫu nhiên cho fallback
      } finally {
        setLoading(false);
      }
    };
    fetchArticleDetail();
  }, [id]);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault(); 
    if (!userToken) {
      showToast("🔒 Vui lòng đăng nhập để bình luận!");
      return;
    }
    if (!newComment.trim()) return;

    setIsSubmittingComment(true);
    try {
      // Giả lập gửi lên API (Triệu thay bằng endpoint thật của mình)
      const fallbackComment = { id: Date.now(), user_name: "Bạn (Local)", content: newComment, created_at: "Vừa xong", replies: [] };
      setComments(prev => [fallbackComment, ...prev]);
      setNewComment("");
      showToast("✅ Đã gửi bình luận!");
    } finally {
      setIsSubmittingComment(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center font-serif italic">Đang tải nội dung cho Triệu...</div>;
  if (!article) return <div className="text-center py-20 font-bold">404 - Không tìm thấy bài viết.</div>;

  return (
    <div className="min-h-screen bg-[#fdfdfc] dark:bg-[#0d0d0d] font-sans transition-colors duration-500 relative">
      {/* READING PROGRESS BAR */}
      <div 
        className="fixed top-0 left-0 h-1 bg-blue-600 z-[1000] transition-all duration-300 shadow-[0_0_10px_rgba(37,99,235,0.5)]" 
        style={{ width: `${scrollProgress}%` }}
      ></div>

      {toastMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-blue-600 text-white px-8 py-3 rounded-full shadow-2xl font-black uppercase text-[10px] tracking-widest animate-in fade-in slide-in-from-top-4">
          {toastMessage}
        </div>
      )}

      <article className="container mx-auto px-6 lg:px-0 pt-16 max-w-[800px] animate-fade-in-up">
        <div className="mb-10 flex items-center gap-3 text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">
           <Link to="/" className="hover:text-blue-600">Trang chủ</Link>
           <span className="w-1 h-1 rounded-full bg-gray-300"></span>
           <span className="text-blue-600 font-black">{article?.category}</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-black dark:text-white mb-10 leading-[1.1] font-serif tracking-tight">
          {article?.title}
        </h1>

        <div className="flex justify-between items-center py-8 border-y border-black/5 dark:border-white/5 mb-12">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600 text-white flex items-center justify-center font-black text-xl rounded-full shadow-lg shadow-blue-500/20">
              {article?.author?.charAt(0)}
            </div>
            <div>
              <div className="font-black text-[11px] dark:text-white uppercase tracking-widest">{article?.author}</div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Đăng ngày {article?.created_at?.split(' ')[0]}</div>
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={handleSaveArticle} className={`px-6 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-full transition-all active:scale-95 ${isSaved ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'bg-gray-100 dark:bg-white/5 dark:text-white hover:bg-gray-200 dark:hover:bg-white/10'}`}>
              {isSaved ? "Đã lưu ✓" : "Lưu bài +"}
            </button>
          </div>
        </div>

        {article?.image_url && (
          <div className="mb-12 rounded-3xl overflow-hidden premium-shadow group">
            <img 
              src={article.image_url} 
              alt={article.title} 
              className="w-full object-cover transform transition-transform duration-1000 group-hover:scale-105" 
              onError={(e) => { e.target.onerror = null; e.target.src = "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80"; }}
            />
          </div>
        )}

        <div className="prose prose-xl dark:prose-invert max-w-none">
          <div className="font-bold text-2xl mb-12 text-gray-500 dark:text-gray-400 leading-relaxed italic border-l-4 border-blue-600 pl-8 font-serif">
            {article?.summary}
          </div>
          <div className="leading-[1.8] text-[19px] dark:text-gray-300 font-medium space-y-6 article-body" dangerouslySetInnerHTML={{ __html: article?.content }} />
        </div>

        {/* SOCIAL SHARE & TAGS */}
        <div className="mt-16 pt-10 border-t border-black/5 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
             <div className="flex items-center gap-4">
                 <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Chia sẻ bài viết:</span>
                 <div className="flex gap-2">
                     <button className="w-10 h-10 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-blue-500/20 active:scale-95">f</button>
                     <button className="w-10 h-10 rounded-full bg-[#1DA1F2] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-sky-400/20 active:scale-95">t</button>
                     <button className="w-10 h-10 rounded-full bg-gray-900 dark:bg-white dark:text-black text-white flex items-center justify-center hover:scale-110 transition-transform active:scale-95">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                     </button>
                 </div>
             </div>
             <div className="flex gap-2">
                 <span className="px-4 py-1.5 bg-gray-100 dark:bg-white/5 rounded-full text-[10px] font-black text-gray-400 uppercase tracking-widest">#tintuc</span>
                 <span className="px-4 py-1.5 bg-blue-50 dark:bg-blue-900/10 rounded-full text-[10px] font-black text-blue-600 uppercase tracking-widest">#{article?.category?.toLowerCase()}</span>
             </div>
        </div>

        {/* PHẦN BÌNH LUẬN NÂNG CẤP */}
        <div className="mt-32 pt-20 border-t border-black/5 dark:border-white/5">
          <div className="flex items-center justify-between mb-12">
            <h3 className="text-3xl font-black dark:text-white font-serif">Bình luận <span className="text-blue-600 ml-2">({comments.length})</span></h3>
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Cộng đồng TINTUC.VN</span>
          </div>
          
          <form onSubmit={handleCommentSubmit} className="mb-20">
            <textarea 
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Chia sẻ ý kiến của bạn..."
              className="w-full p-8 bg-gray-50 dark:bg-white/5 rounded-3xl border border-black/5 dark:border-white/5 focus:border-blue-500/50 outline-none transition-all dark:text-white font-medium text-base resize-none"
              rows="4"
            />
            <div className="flex justify-end mt-4">
                <button type="submit" disabled={isSubmittingComment} className="px-10 py-4 bg-blue-600 text-white font-black uppercase text-[10px] tracking-widest rounded-full hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/30 active:scale-95">
                  {isSubmittingComment ? "Đang gửi..." : "Gửi thảo luận"}
                </button>
            </div>
          </form>

          <div className="space-y-12">
            {comments.map((c, idx) => (
              <div key={c.id || idx} className="group animate-fade-in-up">
                {/* Bình luận cha */}
                <div className="flex gap-6">
                  <div className="w-14 h-14 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 flex-shrink-0 flex items-center justify-center font-black shadow-inner">
                    {c?.user_name?.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <span className="font-black text-sm uppercase dark:text-white tracking-tight">{c?.user_name}</span>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{c.created_at}</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-medium text-[15px]">{c?.content}</p>
                    
                    {/* Render Các Câu Trả Lời (Replies) */}
                    {c.replies && c.replies.length > 0 && (
                      <div className="mt-8 ml-4 pl-8 border-l-2 border-black/5 dark:border-white/10 space-y-8">
                        {c.replies.map(reply => (
                          <div key={reply.id} className="flex gap-5">
                            <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/5 text-gray-500 flex-shrink-0 flex items-center justify-center text-[11px] font-black">
                              {reply?.user_name?.charAt(0)}
                            </div>
                            <div>
                              <div className="flex items-center gap-3 mb-1">
                                <span className="font-black text-[13px] dark:text-white tracking-tight">{reply?.user_name}</span>
                                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{reply.created_at}</span>
                              </div>
                              <p className="text-[14px] text-gray-500 dark:text-gray-400 leading-relaxed font-medium">{reply.content}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PREMIUM NEWSLETTER SECTION */}
        <div className="mt-32 p-16 bg-blue-600 rounded-[3rem] text-white text-center premium-shadow relative overflow-hidden group">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 group-hover:scale-110 transition-transform duration-1000"></div>
             <div className="relative z-10">
                 <h3 className="text-4xl font-black mb-6 font-serif tracking-tight">Đừng bỏ lỡ những câu chuyện quan trọng</h3>
                 <p className="text-blue-100 mb-10 max-w-lg mx-auto font-medium text-lg leading-relaxed">Nhận bản tin tổng hợp những sự kiện nóng hổi nhất mỗi sáng vào hộp thư của bạn.</p>
                 <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                     <input type="email" placeholder="Email của bạn..." className="flex-1 bg-white/10 border border-white/20 px-8 py-5 rounded-2xl outline-none focus:bg-white focus:text-black transition-all font-bold placeholder:text-blue-200" />
                     <button className="bg-white text-blue-600 px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-blue-50 transition-all shadow-xl active:scale-95">Đăng ký</button>
                 </div>
             </div>
        </div>
      </article>
    </div>
  );
}

export default ArticleDetail;
