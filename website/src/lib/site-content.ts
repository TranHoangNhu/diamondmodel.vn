import { PHO_GIA_COMPANY, PHO_GIA_PROJECTS } from "@/lib/phogia";

export const SITE_URL = "https://phogiadecor.vn";
export const SITE_BUILD_DATE_ISO = "2026-04-18";

export type ArticleMeta = {
  label: string;
  value: string;
};

export type ArticleSection = {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
  image?: {
    src: string;
    alt: string;
    caption?: string;
  };
};

export type ArticleItem = {
  slug: string;
  categoryLabel: string;
  categoryHref: string;
  title: string;
  summary: string;
  heroImage: string;
  heroAlt: string;
  publishedAt: string;
  dateLabel: string;
  readTime: string;
  meta: ArticleMeta[];
  tags: string[];
  sections: ArticleSection[];
  relatedSlugs: string[];
};

export type ArchiveCollection = {
  slug: "gioi-thieu" | "du-an" | "dich-vu" | "tin-tuc";
  label: string;
  title: string;
  description: string;
  eyebrow: string;
  heroImage: string;
  heroAlt: string;
  filters: string[];
  ctaLabel: string;
  ctaHref: string;
  featuredSlug?: string;
  items: ArticleItem[];
};

type ProjectGroup = (typeof PHO_GIA_PROJECTS)[number];
type ProjectItem = ProjectGroup["items"][number];

const PROJECT_GROUP_INFO: Record<
  ProjectGroup["id"],
  {
    categoryLabel: string;
    summaryLead: string;
    intro: string;
    designFocus: string[];
    executionFocus: string[];
    closing: string;
  }
> = {
  "design-apartment": {
    categoryLabel: "Căn hộ",
    summaryLead: "Không gian căn hộ cần gọn, sáng và có nhịp sử dụng linh hoạt.",
    intro:
      "Các dự án căn hộ của Phố Gia luôn bắt đầu từ câu chuyện sinh hoạt thật: ai sử dụng, thói quen nào cần giữ, và đâu là chi tiết có thể tối ưu để căn hộ vận hành nhẹ nhàng hơn.",
    designFocus: [
      "Ưu tiên bố cục mạch lạc để mặt bằng nhỏ vẫn thoáng và dễ đi lại.",
      "Khai thác hệ lưu trữ âm tường, tủ kịch trần và các chi tiết đa năng.",
      "Giữ bảng màu cân bằng để không gian sáng hơn và bền hơn theo thời gian.",
    ],
    executionFocus: [
      "Đối chiếu bản vẽ với thực tế sản xuất để hạn chế sai số khi lắp đặt.",
      "Chọn vật liệu có độ ổn định tốt, phù hợp với cường độ sử dụng hằng ngày.",
      "Rà soát từng điểm nối, nẹp và hoàn thiện bề mặt trước khi bàn giao.",
    ],
    closing:
      "Kết quả là một căn hộ có cảm giác sống được ngay, đủ tinh tế cho những buổi tiếp khách nhưng vẫn ấm áp khi trở về mỗi ngày.",
  },
  "design-townhouse": {
    categoryLabel: "Nhà phố & villa",
    summaryLead: "Nhà phố và villa cần cân bằng giữa công năng gia đình và cảm giác sang trọng.",
    intro:
      "Nhóm công trình nhà phố, villa và không gian nhiều tầng luôn đòi hỏi sự đồng bộ giữa mặt tiền, công năng và cách phân lớp vật liệu. Phố Gia xử lý bài toán này bằng cách giữ cho ngôn ngữ thiết kế đủ nhất quán nhưng không đơn điệu.",
    designFocus: [
      "Phân tầng rõ khu vực sinh hoạt chung, riêng tư và tiếp khách.",
      "Dùng điểm nhấn vật liệu để dẫn hướng thị giác nhưng không làm nặng mặt bằng.",
      "Tạo trục ánh sáng và thông gió giúp công trình có cảm giác rộng hơn diện tích thực.",
    ],
    executionFocus: [
      "Theo dõi kỹ các chi tiết bo góc, phào chỉ và mảng chuyển vật liệu.",
      "Đồng bộ màu sơn, veneer, đá và kim loại để mặt bằng có chiều sâu.",
      "Phối hợp giữa xưởng và công trình để đảm bảo đúng tinh thần thiết kế ban đầu.",
    ],
    closing:
      "Khi hoàn thiện, nhà phố và villa không chỉ đẹp hơn mà còn có trật tự rõ ràng, dễ sử dụng và dễ bảo trì trong thời gian dài.",
  },
  construction: {
    categoryLabel: "Thi công nội thất",
    summaryLead: "Thi công là nơi ý tưởng được chuyển thành sản phẩm thực tế chính xác.",
    intro:
      "Với các công trình thi công nội thất, mục tiêu của Phố Gia là giữ sự khớp giữa bản vẽ, vật liệu và tiến độ. Đây là giai đoạn đòi hỏi kiểm soát chặt nhưng vẫn phải đủ linh hoạt để xử lý những phát sinh tại công trình.",
    designFocus: [
      "Chuẩn hóa hồ sơ kỹ thuật trước khi bước vào sản xuất.",
      "Đảm bảo cấu tạo, kích thước và vị trí lắp đặt khớp với hiện trạng.",
      "Giữ nhịp hoàn thiện nhẹ nhàng để công trình đi vào sử dụng đúng kế hoạch.",
    ],
    executionFocus: [
      "Kiểm tra từng bóc tách, từng cụm chi tiết trước khi xuất xưởng.",
      "Giám sát lắp đặt tại chỗ và xử lý sai số ngay trong ngày.",
      "Nghiệm thu theo lớp: cấu tạo, bề mặt, phụ kiện và khả năng vận hành.",
    ],
    closing:
      "Một công trình thi công tốt không cần phô trương, nhưng phải cho khách hàng cảm giác yên tâm ngay từ lần chạm đầu tiên.",
  },
};

export const SERVICE_BLUEPRINTS = [
  {
    slug: "tu-van-thiet-ke-noi-that",
    title: "Tư vấn thiết kế nội thất",
    summary:
      "Quy trình tư vấn giúp gia chủ xác định nhu cầu, phong cách và ngân sách trước khi bắt tay vào bản vẽ.",
    heroImage: PHO_GIA_COMPANY.missionImage,
    heroAlt: "Tư vấn thiết kế nội thất Phố Gia",
    categoryLabel: "Dịch vụ",
    meta: [
      { label: "Loại", value: "Gặp gỡ & khảo sát" },
      { label: "Thời gian", value: "1-2 buổi" },
      { label: "Mục tiêu", value: "Chốt định hướng rõ ràng" },
    ],
    tags: ["Tư vấn", "Khảo sát", "Định hướng"],
    sections: [
      {
        id: "ban-chat",
        title: "Bản chất của buổi tư vấn",
        paragraphs: [
          "Buổi tư vấn đầu tiên không chỉ là nghe nhu cầu, mà còn là quá trình tách bạch đâu là mong muốn, đâu là giới hạn thực tế và đâu là phần có thể tối ưu thêm cho không gian.",
          "Phố Gia thường bắt đầu bằng việc đặt các câu hỏi rất cụ thể về nhịp sống, số lượng người dùng, thói quen lưu trữ và cảm giác mong muốn khi bước vào nhà.",
        ],
        bullets: [
          "Xác định phong cách phù hợp với lối sống.",
          "Ước lượng sơ bộ ngân sách và phạm vi đầu tư.",
          "Chốt những hạng mục nên ưu tiên trước.",
        ],
      },
      {
        id: "quy-trinh",
        title: "Quy trình làm việc",
        paragraphs: [
          "Sau buổi trao đổi, đội ngũ sẽ tổng hợp hiện trạng, ghi nhận các điểm cần xử lý và đề xuất định hướng mặt bằng hoặc moodboard sơ bộ.",
          "Cách làm này giúp khách hàng tránh được tình trạng đổi ý quá nhiều ở giai đoạn sau, khi việc điều chỉnh đã bắt đầu tốn kém hơn.",
        ],
      },
      {
        id: "gia-tri",
        title: "Giá trị nhận được",
        paragraphs: [
          "Khách hàng có một khung tham chiếu rõ ràng hơn trước khi ký hợp đồng thiết kế hoặc thi công.",
          "Đó là nền tảng để các bước sau diễn ra mạch lạc, giảm phát sinh và giữ được đúng gu ban đầu.",
        ],
      },
    ],
  },
  {
    slug: "thiet-ke-noi-that-tron-goi",
    title: "Thiết kế nội thất trọn gói",
    summary:
      "Dịch vụ trọn gói kết nối bản vẽ, vật liệu và hồ sơ thi công trong một quy trình thống nhất.",
    heroImage: PHO_GIA_COMPANY.trustImage,
    heroAlt: "Thiết kế nội thất trọn gói Phố Gia",
    categoryLabel: "Dịch vụ",
    meta: [
      { label: "Loại", value: "Hồ sơ thiết kế" },
      { label: "Thời gian", value: "7-14 ngày" },
      { label: "Mục tiêu", value: "Đồng bộ từ ý tưởng đến triển khai" },
    ],
    tags: ["Thiết kế", "Hồ sơ", "Đồng bộ"],
    sections: [
      {
        id: "pham-vi",
        title: "Phạm vi của dịch vụ",
        paragraphs: [
          "Thiết kế trọn gói không dừng ở phối cảnh. Dịch vụ này bao gồm phân tích nhu cầu, lên mặt bằng công năng, phát triển concept, lựa chọn vật liệu và hoàn thiện hồ sơ để sẵn sàng bước vào sản xuất.",
          "Cách làm trọn gói giúp gia chủ nhìn được toàn bộ hành trình ngay từ đầu, hạn chế cảm giác rời rạc giữa ý tưởng và thực tế.",
        ],
        bullets: [
          "Concept và moodboard tổng thể.",
          "Mặt bằng bố trí và phối cảnh 3D.",
          "Hồ sơ kỹ thuật phục vụ sản xuất và thi công.",
        ],
      },
      {
        id: "lap-trinh",
        title: "Cách Phố Gia triển khai",
        paragraphs: [
          "Đội ngũ sẽ đi theo thứ tự: khảo sát, lên định hướng, chốt phương án, kiểm tra kỹ thuật và bàn giao hồ sơ.",
          "Mỗi mốc đều có người chịu trách nhiệm rõ ràng để đảm bảo bản vẽ không chỉ đẹp mà còn đủ khả năng thi công.",
        ],
      },
      {
        id: "doi-tuong",
        title: "Dành cho ai",
        paragraphs: [
          "Đây là lựa chọn phù hợp với khách hàng muốn kiểm soát chất lượng đồng thời cả thẩm mỹ, công năng và tiến độ.",
          "Đặc biệt hiệu quả với những công trình cần một ngôn ngữ thiết kế nhất quán trên nhiều khu vực chức năng.",
        ],
      },
    ],
  },
  {
    slug: "thi-cong-noi-that",
    title: "Thi công nội thất",
    summary:
      "Thi công nội thất tập trung vào độ chuẩn xác, tiến độ và chất lượng hoàn thiện tại công trình.",
    heroImage: PHO_GIA_COMPANY.processThumb,
    heroAlt: "Thi công nội thất Phố Gia",
    categoryLabel: "Dịch vụ",
    meta: [
      { label: "Loại", value: "Sản xuất & lắp đặt" },
      { label: "Thời gian", value: "Theo quy mô" },
      { label: "Mục tiêu", value: "Đúng bản vẽ - đúng hẹn" },
    ],
    tags: ["Thi công", "Lắp đặt", "Giám sát"],
    sections: [
      {
        id: "huong-di",
        title: "Định hướng thi công",
        paragraphs: [
          "Thi công là bước biến mọi đường nét trên giấy thành khối lượng thật ngoài hiện trường. Vì vậy, điều quan trọng nhất là kiểm soát từ bản vẽ, vật liệu cho tới thứ tự lắp đặt.",
          "Phố Gia coi thi công là một quy trình nhiều lớp, trong đó mỗi lớp đều có tiêu chuẩn riêng trước khi chuyển sang lớp tiếp theo.",
        ],
        bullets: [
          "Bóc tách kỹ thuật rõ trước khi sản xuất.",
          "Giảm sai số khi lên công trình.",
          "Rà soát chất lượng theo từng hạng mục.",
        ],
      },
      {
        id: "kiem-soat",
        title: "Cách kiểm soát chất lượng",
        paragraphs: [
          "Xưởng và công trình luôn cần nói cùng một ngôn ngữ. Vì vậy, mọi chi tiết từ kích thước, bề mặt cho đến phụ kiện đều được kiểm tra theo checklist thống nhất.",
          "Cách làm này giúp công trình hạn chế phát sinh, đồng thời giữ cho quá trình lắp đặt diễn ra gọn và an toàn hơn.",
        ],
      },
      {
        id: "ban-giao",
        title: "Bàn giao công trình",
        paragraphs: [
          "Khi bàn giao, khách hàng không chỉ nhận một không gian hoàn thiện, mà còn nhận bộ hồ sơ và hướng dẫn vận hành rõ ràng.",
          "Đó là nền tảng để sử dụng bền hơn và xử lý nhanh hơn khi cần bảo trì về sau.",
        ],
      },
    ],
  },
  {
    slug: "bao-hanh-bao-tri-noi-that",
    title: "Bảo hành & bảo trì",
    summary:
      "Dịch vụ hậu mãi giúp công trình giữ được độ ổn định và thẩm mỹ trong suốt quá trình sử dụng.",
    heroImage: PHO_GIA_COMPANY.heroPoster,
    heroAlt: "Bảo hành và bảo trì nội thất Phố Gia",
    categoryLabel: "Dịch vụ",
    meta: [
      { label: "Loại", value: "Hậu mãi" },
      { label: "Thời gian", value: "Dài hạn" },
      { label: "Mục tiêu", value: "Vận hành ổn định" },
    ],
    tags: ["Bảo hành", "Bảo trì", "Hậu mãi"],
    sections: [
      {
        id: "y-nghia",
        title: "Vì sao hậu mãi quan trọng",
        paragraphs: [
          "Nội thất không kết thúc ở ngày bàn giao. Trong quá trình sử dụng, các phụ kiện, bề mặt và cấu tạo có thể cần được kiểm tra lại để duy trì hiệu quả vận hành.",
          "Một dịch vụ bảo hành và bảo trì tốt giúp khách hàng yên tâm hơn về chi phí dài hạn lẫn độ bền công trình.",
        ],
        bullets: [
          "Kiểm tra các điểm chịu lực và phụ kiện.",
          "Xử lý nhanh các phát sinh sau sử dụng.",
          "Giữ thẩm mỹ công trình ổn định lâu dài.",
        ],
      },
      {
        id: "quy-trinh",
        title: "Quy trình hỗ trợ",
        paragraphs: [
          "Phố Gia tiếp nhận yêu cầu, kiểm tra thực tế, xác định nguyên nhân và đề xuất phương án xử lý phù hợp với từng công trình.",
          "Mục tiêu là khôi phục chất lượng vận hành mà không làm ảnh hưởng đến tổng thể thiết kế ban đầu.",
        ],
      },
      {
        id: "cam-ket",
        title: "Cam kết sau bàn giao",
        paragraphs: [
          "Khách hàng luôn có một đầu mối rõ ràng để liên hệ khi cần hỗ trợ.",
          "Đó là cách Phố Gia giữ trọn trách nhiệm cho công trình, không để việc bàn giao là điểm kết thúc của trải nghiệm.",
        ],
      },
    ],
  },
] as const;

const NEWS_ITEMS = [
  {
    slug: "5-nguyen-tac-phoi-vat-lieu-de-khong-gian-trong-sang-hon",
    title: "5 nguyên tắc phối vật liệu để không gian trông sang hơn",
    summary:
      "Một bảng vật liệu tốt không cần quá nhiều chất liệu, nhưng cần đủ nhịp điệu, độ tương phản và điểm nhấn.",
    heroImage: PHO_GIA_COMPANY.missionImage,
    heroAlt: "Phối vật liệu nội thất",
    publishedAt: "2025-12-04",
    readTime: "5 phút",
    meta: [
      { label: "Chuyên mục", value: "Tin tức" },
      { label: "Đăng ngày", value: "04/12/2025" },
      { label: "Đọc", value: "5 phút" },
    ],
    tags: ["Vật liệu", "Màu sắc", "Thiết kế"],
    sections: [
      {
        id: "mo-dau",
        title: "Vì sao vật liệu quyết định cảm giác không gian",
        paragraphs: [
          "Trong nội thất, vật liệu là thứ người dùng nhìn thấy trước cả khi chạm tay vào. Nó quyết định ánh nhìn đầu tiên, độ sang và cả cảm giác bền vững của công trình.",
          "Khi vật liệu được phối đúng, một căn phòng bình thường có thể trở nên chỉn chu hơn mà không cần quá nhiều chi tiết trang trí.",
        ],
      },
      {
        id: "nguyen-tac",
        title: "Những nguyên tắc nên nhớ",
        paragraphs: [
          "Hãy ưu tiên một chất liệu chủ đạo, một chất liệu bổ trợ và một điểm nhấn để tránh cảm giác rối mắt.",
          "Sự lặp lại có kiểm soát giữa vân gỗ, mảng sơn và chi tiết kim loại sẽ giúp không gian có chiều sâu hơn.",
        ],
        bullets: [
          "Giữ nhịp tương phản vừa đủ.",
          "Tránh ghép quá nhiều vân mạnh cùng lúc.",
          "Đặt ưu tiên vào độ bền trước khi chạy theo xu hướng.",
        ],
      },
      {
        id: "ket-luan",
        title: "Khi nào nên trao đổi với kiến trúc sư",
        paragraphs: [
          "Nếu bạn chưa chắc chắn về bảng vật liệu hoặc lo ngại chi phí phát sinh, hãy trao đổi với đơn vị thiết kế ngay từ đầu để cân được ngôn ngữ và ngân sách.",
          "Đó là cách tiết kiệm thời gian nhất cho cả thiết kế lẫn thi công.",
        ],
      },
    ],
  },
  {
    slug: "bi-quyet-kiem-soat-ngan-sach-khi-lam-noi-that-tron-goi",
    title: "Bí quyết kiểm soát ngân sách khi làm nội thất trọn gói",
    summary:
      "Ngân sách hiệu quả không đến từ việc cắt giảm mọi thứ, mà đến từ việc ưu tiên đúng chỗ và chốt sớm phạm vi đầu tư.",
    heroImage: PHO_GIA_COMPANY.processDesktop,
    heroAlt: "Kiểm soát ngân sách thi công nội thất",
    publishedAt: "2025-11-20",
    readTime: "4 phút",
    meta: [
      { label: "Chuyên mục", value: "Tin tức" },
      { label: "Đăng ngày", value: "20/11/2025" },
      { label: "Đọc", value: "4 phút" },
    ],
    tags: ["Ngân sách", "Thi công", "Kế hoạch"],
    sections: [
      {
        id: "xay-khung",
        title: "Xây khung ngân sách ngay từ đầu",
        paragraphs: [
          "Ngân sách thường bị vượt vì phạm vi đầu tư ban đầu không được chốt đủ rõ. Khi chưa xác định rõ ưu tiên, mỗi thay đổi nhỏ về vật liệu hay layout đều có thể tạo ra một chuỗi điều chỉnh dây chuyền.",
          "Một bản khung rõ ràng sẽ giúp bạn kiểm soát tiến độ ra quyết định tốt hơn.",
        ],
        bullets: [
          "Chốt hạng mục bắt buộc và hạng mục có thể linh hoạt.",
          "Ước lượng sớm chi phí vật liệu chủ đạo.",
          "Dành một khoản dự phòng cho phát sinh hợp lý.",
        ],
      },
      {
        id: "uu-tien",
        title: "Ưu tiên đúng khu vực",
        paragraphs: [
          "Phòng khách, bếp và khu ngủ thường là ba khu vực ảnh hưởng lớn nhất đến trải nghiệm sử dụng, nên cần được xử lý cẩn thận trước.",
          "Các chi tiết trang trí có thể tinh giản nếu bạn muốn dành ngân sách cho những hạng mục có tác động lớn hơn đến công năng.",
        ],
      },
      {
        id: "chot-som",
        title: "Chốt sớm vật liệu và phụ kiện",
        paragraphs: [
          "Vật liệu càng đổi muộn thì chi phí kiểm soát càng khó. Chốt sớm giúp bộ phận thiết kế và thi công có cùng một đầu bài để triển khai.",
          "Khi đó, bản vẽ, mua hàng và sản xuất đều vận hành mạch lạc hơn.",
        ],
      },
    ],
  },
  {
    slug: "bi-quyet-toi-uu-anh-sang-tu-nhien-trong-nha",
    title: "Bí quyết tối ưu ánh sáng tự nhiên trong nhà",
    summary:
      "Ánh sáng tự nhiên không chỉ làm không gian sáng hơn mà còn giúp đồ nội thất có chiều sâu và cảm giác dễ chịu hơn.",
    heroImage: PHO_GIA_COMPANY.trustImage,
    heroAlt: "Tối ưu ánh sáng tự nhiên",
    publishedAt: "2025-08-06",
    readTime: "6 phút",
    meta: [
      { label: "Chuyên mục", value: "Tin tức" },
      { label: "Đăng ngày", value: "06/08/2025" },
      { label: "Đọc", value: "6 phút" },
    ],
    tags: ["Ánh sáng", "Không gian", "Cửa sổ"],
    sections: [
      {
        id: "tai-sao",
        title: "Vì sao nên ưu tiên ánh sáng tự nhiên",
        paragraphs: [
          "Ánh sáng tự nhiên tạo ra cảm giác sạch, thoáng và khiến vật liệu lên màu thật hơn. Đây là một trong những yếu tố giúp căn nhà trông rộng hơn mà không cần can thiệp quá nhiều vào cấu trúc.",
          "Thiết kế tốt là biết cách điều hướng ánh sáng đi qua không gian theo nhịp sinh hoạt của gia chủ.",
        ],
      },
      {
        id: "meo-dung",
        title: "Một vài mẹo thực hành",
        paragraphs: [
          "Hãy cân nhắc vị trí rèm, độ phản chiếu của bề mặt và cách đặt gương để tận dụng nguồn sáng tự nhiên sẵn có.",
          "Một bố cục tốt sẽ để ánh sáng đi vào đúng nơi cần nhấn, thay vì tràn đều khiến không gian bị phẳng.",
        ],
        bullets: [
          "Dùng màu sáng cho các mảng lớn.",
          "Tránh cản sáng ở những trục cửa chính.",
          "Ưu tiên vật liệu có bề mặt phản xạ vừa phải.",
        ],
      },
      {
        id: "tong-ket",
        title: "Khi nào cần thiết kế lại",
        paragraphs: [
          "Nếu căn nhà tối hoặc ánh sáng bị cắt vụn, bạn nên trao đổi với kiến trúc sư để kiểm tra lại bố cục cửa, vách và hệ rèm.",
          "Chỉnh đúng từ đầu sẽ giúp tiết kiệm chi phí vận hành sau này rất nhiều.",
        ],
      },
    ],
  },
];

const ABOUT_GUIDE_ARTICLE: ArticleItem = {
  slug: "gioi-thieu",
  categoryLabel: "Giới thiệu",
  categoryHref: "/gioi-thieu",
  title: "Những điều cần lưu ý trước khi thiết kế và thi công nội thất",
  summary:
    "Bài viết này giúp bạn xác định đúng nhu cầu, đúng thời điểm và đúng thứ tự ưu tiên trước khi bắt đầu một dự án nội thất.",
  heroImage: PHO_GIA_COMPANY.heroPoster,
  heroAlt: "Giới thiệu Phố Gia Decor",
  publishedAt: SITE_BUILD_DATE_ISO,
  dateLabel: "18/04/2026",
  readTime: "6 phút",
  meta: [
    { label: "Chủ đề", value: "Giới thiệu" },
    { label: "Đăng ngày", value: "18/04/2026" },
    { label: "Đọc", value: "6 phút" },
  ],
  tags: ["Thiết kế", "Thi công", "Quy trình"],
  sections: [
    {
      id: "bat-dau",
      title: "Bắt đầu từ nhu cầu thật",
      paragraphs: [
        "Một dự án nội thất chỉ đi đúng hướng khi nhu cầu thật của gia chủ được xác định trước khi nói đến phong cách. Không ít công trình bị kéo lệch vì quyết định được đưa ra quá sớm, chỉ dựa trên cảm hứng nhất thời.",
        "Phố Gia thường bắt đầu bằng việc đọc thói quen sinh hoạt, số lượng người dùng và những điểm bất tiện đang tồn tại trong không gian hiện hữu.",
      ],
      bullets: [
        "Ai là người sử dụng chính của không gian.",
        "Mức độ ưu tiên giữa công năng và thẩm mỹ.",
        "Những món đồ cần giữ lại hoặc thay mới.",
      ],
    },
    {
      id: "luu-y-phong-cach",
      title: "Phong cách chỉ là điểm khởi đầu",
      paragraphs: [
        "Phong cách có thể định hình ngôn ngữ thị giác, nhưng không phải là toàn bộ câu chuyện. Một không gian đẹp phải đồng thời giải được bài toán lưu trữ, ánh sáng và sự thuận tiện trong vận hành hằng ngày.",
        "Vì vậy, khi chọn phong cách, hãy xem đó là khung tham chiếu để triển khai chứ không phải đích đến duy nhất.",
      ],
      image: {
        src: PHO_GIA_COMPANY.missionImage,
        alt: "Quy trình thiết kế nội thất Phố Gia",
        caption: "Không gian tốt phải cân bằng giữa gu thẩm mỹ và cách sử dụng thật của gia chủ.",
      },
    },
    {
      id: "vat-lieu-va-anh-sang",
      title: "Vật liệu, ánh sáng và tỷ lệ",
      paragraphs: [
        "Ba yếu tố này quyết định phần lớn cảm giác của căn nhà. Vật liệu tạo độ bền và cảm xúc chạm, ánh sáng làm nổi bật cấu trúc, còn tỷ lệ giúp không gian trông gọn và có trật tự.",
        "Khi ba lớp này được phối hợp tốt, nội thất sẽ có độ sang đủ tự nhiên và không cần lạm dụng trang trí.",
      ],
      bullets: [
        "Giữ vật liệu chủ đạo nhất quán theo từng khu vực.",
        "Tận dụng ánh sáng tự nhiên trước khi thêm ánh sáng nhân tạo.",
        "Tỷ lệ tủ, bàn, ghế và khoảng trống phải đi cùng nhau.",
      ],
    },
    {
      id: "quy-trinh",
      title: "Quy trình làm việc rõ ràng giúp giảm phát sinh",
      paragraphs: [
        "Một quy trình tốt giúp khách hàng biết chính xác đang ở đâu, giai đoạn nào và cần quyết định gì tiếp theo. Đó cũng là cách để kiểm soát chi phí và tiến độ một cách minh bạch hơn.",
        "Tại Phố Gia, mọi công trình đều được chuyển qua các bước rõ ràng từ tư vấn, thiết kế, sản xuất đến lắp đặt và bảo hành.",
      ],
      bullets: [
        "Khảo sát và đặt bài toán ban đầu.",
        "Triển khai thiết kế và chốt vật liệu.",
        "Sản xuất, lắp đặt và nghiệm thu.",
      ],
    },
    {
      id: "dat-lich",
      title: "Khi nào nên đặt lịch tư vấn",
      paragraphs: [
        "Thời điểm phù hợp nhất là ngay khi bạn đã có nhu cầu rõ nhưng chưa chốt bản vẽ hay vật liệu. Khi đó, tư vấn sẽ có nhiều cơ hội tối ưu hơn và tránh chỉnh sửa về sau.",
        "Nếu bạn đang chuẩn bị làm mới căn hộ, nhà phố hoặc villa, hãy bắt đầu bằng một buổi trao đổi ngắn để xác định hướng đi phù hợp.",
      ],
    },
  ],
  relatedSlugs: [],
};

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "d")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function formatDisplayDate(isoDate: string) {
  const date = new Date(isoDate);
  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

function cleanMetric(value: string) {
  return value.replace(/^[^:]+:\s*/u, "").trim();
}

function section(
  id: string,
  title: string,
  paragraphs: string[],
  bullets?: string[],
  image?: ArticleSection["image"],
): ArticleSection {
  return {
    id,
    title,
    paragraphs,
    ...(bullets && bullets.length > 0 ? { bullets } : {}),
    ...(image ? { image } : {}),
  };
}

function createProjectArticle(group: ProjectGroup, item: ProjectItem, index: number): ArticleItem {
  const info = PROJECT_GROUP_INFO[group.id];
  const slug = `${slugify(item.title)}-${index + 1}`;
  const area = cleanMetric(item.meta1);
  const detail = cleanMetric(item.meta2);
  const publishedAt = SITE_BUILD_DATE_ISO;
  const dateLabel = formatDisplayDate(publishedAt);
  const summary = `${item.title} là một công trình thuộc nhóm ${info.categoryLabel.toLowerCase()}, được triển khai theo tinh thần gọn, rõ và đúng gu. Bài viết này đi từ bối cảnh, giải pháp thiết kế cho đến thi công và bàn giao.`;

  return {
    slug,
    categoryLabel: info.categoryLabel,
    categoryHref: "/du-an",
    title: item.title,
    summary,
    heroImage: item.image,
    heroAlt: item.title,
    publishedAt,
    dateLabel,
    readTime: "4 phút",
    meta: [
      { label: "Hạng mục", value: info.categoryLabel },
      { label: "Quy mô", value: area },
      { label: "Trạng thái", value: detail || "Hoàn thiện" },
    ],
    tags: [info.categoryLabel, "Phố Gia", detail || "Thiết kế & thi công"],
    sections: [
      section(
        "boi-canh",
        "Bối cảnh và yêu cầu",
        [
          `${item.title} thuộc nhóm ${info.categoryLabel.toLowerCase()} với quy mô ${area}. Phố Gia tiếp cận bài toán này bằng cách đặt lại thứ tự ưu tiên: công năng trước, thẩm mỹ sau, rồi mới tối ưu chi tiết.`,
          info.intro,
        ],
        [
          ...info.designFocus,
          `Điểm xuất phát của công trình là nhu cầu ${detail.toLowerCase()}.`,
        ],
      ),
      section(
        "giai-phap",
        "Giải pháp thiết kế",
        [
          `${info.summaryLead} Vì vậy, từng mảng bố trí, tỷ lệ tủ kệ và điểm nhấn vật liệu đều được tính toán để không gian giữ được độ thoáng cần thiết.`,
          "Khi concept được giữ đủ rõ, công trình sẽ dễ đi qua nhiều giai đoạn mà vẫn giữ được ngôn ngữ ban đầu.",
        ],
        info.designFocus,
      ),
      section(
        "thi-cong",
        "Vật liệu và thi công",
        [
          `${info.executionFocus[0]} ${info.executionFocus[1]}`,
          `${info.executionFocus[2]} Khâu sản xuất, lắp đặt và hoàn thiện luôn được soi kỹ để tránh sai số nhỏ tích tụ thành vấn đề lớn ở cuối dự án.`,
        ],
        info.executionFocus,
      ),
      section(
        "ban-giao",
        "Giá trị bàn giao",
        [
          info.closing,
          "Sau bàn giao, khách hàng nhận được một không gian không chỉ đẹp ở thời điểm chụp ảnh, mà còn có khả năng vận hành ổn định trong thời gian dài.",
        ],
        [
          `Phù hợp với ${info.categoryLabel.toLowerCase()}.`,
          "Có thể bảo trì và thay đổi từng phần khi cần.",
          "Giữ được tinh thần thiết kế trong đời sống thực.",
        ],
      ),
    ],
    relatedSlugs: [],
  };
}

function createServiceArticle(
  input: Omit<ArticleItem, "relatedSlugs"> | ArticleItem,
): ArticleItem {
  return {
    ...input,
    relatedSlugs: "relatedSlugs" in input ? input.relatedSlugs : [],
  };
}

function createNewsArticle(input: Omit<ArticleItem, "relatedSlugs">): ArticleItem {
  return {
    ...input,
    relatedSlugs: [],
  };
}

const PROJECT_ITEMS = PHO_GIA_PROJECTS.flatMap((group) =>
  group.items.map((item, index) => createProjectArticle(group, item, index)),
);

const PROJECT_BY_CATEGORY = new Map<string, ArticleItem[]>();

PROJECT_ITEMS.forEach((item) => {
  const list = PROJECT_BY_CATEGORY.get(item.categoryLabel) ?? [];
  list.push(item);
  PROJECT_BY_CATEGORY.set(item.categoryLabel, list);
});

PROJECT_ITEMS.forEach((item) => {
  const list = PROJECT_BY_CATEGORY.get(item.categoryLabel) ?? [];
  item.relatedSlugs = list
    .filter((candidate) => candidate.slug !== item.slug)
    .slice(0, 3)
    .map((candidate) => candidate.slug);
});

const SERVICE_ITEMS = [
  createServiceArticle({
    slug: "tu-van-thiet-ke-noi-that",
    categoryLabel: "Dịch vụ",
    categoryHref: "/dich-vu",
    title: "Tư vấn thiết kế nội thất",
    summary:
      "Quy trình tư vấn giúp gia chủ xác định nhu cầu, phong cách và ngân sách trước khi bắt tay vào bản vẽ.",
    heroImage: PHO_GIA_COMPANY.missionImage,
    heroAlt: "Tư vấn thiết kế nội thất Phố Gia",
    publishedAt: SITE_BUILD_DATE_ISO,
    dateLabel: formatDisplayDate(SITE_BUILD_DATE_ISO),
    readTime: "5 phút",
    meta: [
      { label: "Loại", value: "Gặp gỡ & khảo sát" },
      { label: "Thời gian", value: "1-2 buổi" },
      { label: "Mục tiêu", value: "Chốt định hướng rõ ràng" },
    ],
    tags: ["Tư vấn", "Khảo sát", "Định hướng"],
    sections: [
      section(
        "ban-chat",
        "Bản chất của buổi tư vấn",
        [
          "Buổi tư vấn đầu tiên không chỉ là nghe nhu cầu, mà là quá trình tách bạch đâu là mong muốn, đâu là giới hạn thực tế và đâu là phần có thể tối ưu thêm cho không gian.",
          "Phố Gia thường bắt đầu bằng việc đặt các câu hỏi rất cụ thể về nhịp sống, số lượng người dùng, thói quen lưu trữ và cảm giác mong muốn khi bước vào nhà.",
        ],
        [
          "Xác định phong cách phù hợp với lối sống.",
          "Ước lượng sơ bộ ngân sách và phạm vi đầu tư.",
          "Chốt những hạng mục nên ưu tiên trước.",
        ],
      ),
      section(
        "quy-trinh",
        "Quy trình làm việc",
        [
          "Sau buổi trao đổi, đội ngũ sẽ tổng hợp hiện trạng, ghi nhận các điểm cần xử lý và đề xuất định hướng mặt bằng hoặc moodboard sơ bộ.",
          "Cách làm này giúp khách hàng tránh được tình trạng đổi ý quá nhiều ở giai đoạn sau, khi việc điều chỉnh đã bắt đầu tốn kém hơn.",
        ],
      ),
      section(
        "gia-tri",
        "Giá trị nhận được",
        [
          "Khách hàng có một khung tham chiếu rõ ràng hơn trước khi ký hợp đồng thiết kế hoặc thi công.",
          "Đó là nền tảng để các bước sau diễn ra mạch lạc, giảm phát sinh và giữ được đúng gu ban đầu.",
        ],
      ),
    ],
    relatedSlugs: [],
  }),
  createServiceArticle({
    slug: "thiet-ke-noi-that-tron-goi",
    categoryLabel: "Dịch vụ",
    categoryHref: "/dich-vu",
    title: "Thiết kế nội thất trọn gói",
    summary:
      "Dịch vụ trọn gói kết nối bản vẽ, vật liệu và hồ sơ thi công trong một quy trình thống nhất.",
    heroImage: PHO_GIA_COMPANY.trustImage,
    heroAlt: "Thiết kế nội thất trọn gói Phố Gia",
    publishedAt: SITE_BUILD_DATE_ISO,
    dateLabel: formatDisplayDate(SITE_BUILD_DATE_ISO),
    readTime: "5 phút",
    meta: [
      { label: "Loại", value: "Hồ sơ thiết kế" },
      { label: "Thời gian", value: "7-14 ngày" },
      { label: "Mục tiêu", value: "Đồng bộ từ ý tưởng đến triển khai" },
    ],
    tags: ["Thiết kế", "Hồ sơ", "Đồng bộ"],
    sections: [
      section(
        "pham-vi",
        "Phạm vi của dịch vụ",
        [
          "Thiết kế trọn gói không dừng ở phối cảnh. Dịch vụ này bao gồm phân tích nhu cầu, lên mặt bằng công năng, phát triển concept, lựa chọn vật liệu và hoàn thiện hồ sơ để sẵn sàng bước vào sản xuất.",
          "Cách làm trọn gói giúp gia chủ nhìn được toàn bộ hành trình ngay từ đầu, hạn chế cảm giác rời rạc giữa ý tưởng và thực tế.",
        ],
        [
          "Concept và moodboard tổng thể.",
          "Mặt bằng bố trí và phối cảnh 3D.",
          "Hồ sơ kỹ thuật phục vụ sản xuất và thi công.",
        ],
      ),
      section(
        "lap-trinh",
        "Cách Phố Gia triển khai",
        [
          "Đội ngũ sẽ đi theo thứ tự: khảo sát, lên định hướng, chốt phương án, kiểm tra kỹ thuật và bàn giao hồ sơ.",
          "Mỗi mốc đều có người chịu trách nhiệm rõ ràng để đảm bảo bản vẽ không chỉ đẹp mà còn đủ khả năng thi công.",
        ],
      ),
      section(
        "doi-tuong",
        "Dành cho ai",
        [
          "Đây là lựa chọn phù hợp với khách hàng muốn kiểm soát chất lượng đồng thời cả thẩm mỹ, công năng và tiến độ.",
          "Đặc biệt hiệu quả với những công trình cần một ngôn ngữ thiết kế nhất quán trên nhiều khu vực chức năng.",
        ],
      ),
    ],
    relatedSlugs: [],
  }),
  createServiceArticle({
    slug: "thi-cong-noi-that",
    categoryLabel: "Dịch vụ",
    categoryHref: "/dich-vu",
    title: "Thi công nội thất",
    summary:
      "Thi công nội thất tập trung vào độ chuẩn xác, tiến độ và chất lượng hoàn thiện tại công trình.",
    heroImage: PHO_GIA_COMPANY.processThumb,
    heroAlt: "Thi công nội thất Phố Gia",
    publishedAt: SITE_BUILD_DATE_ISO,
    dateLabel: formatDisplayDate(SITE_BUILD_DATE_ISO),
    readTime: "5 phút",
    meta: [
      { label: "Loại", value: "Sản xuất & lắp đặt" },
      { label: "Thời gian", value: "Theo quy mô" },
      { label: "Mục tiêu", value: "Đúng bản vẽ - đúng hẹn" },
    ],
    tags: ["Thi công", "Lắp đặt", "Giám sát"],
    sections: [
      section(
        "huong-di",
        "Định hướng thi công",
        [
          "Thi công là bước biến mọi đường nét trên giấy thành khối lượng thật ngoài hiện trường. Vì vậy, điều quan trọng nhất là kiểm soát từ bản vẽ, vật liệu cho tới thứ tự lắp đặt.",
          "Phố Gia coi thi công là một quy trình nhiều lớp, trong đó mỗi lớp đều có tiêu chuẩn riêng trước khi chuyển sang lớp tiếp theo.",
        ],
        [
          "Bóc tách kỹ thuật rõ trước khi sản xuất.",
          "Giảm sai số khi lên công trình.",
          "Rà soát chất lượng theo từng hạng mục.",
        ],
      ),
      section(
        "kiem-soat",
        "Cách kiểm soát chất lượng",
        [
          "Xưởng và công trình luôn cần nói cùng một ngôn ngữ. Vì vậy, mọi chi tiết từ kích thước, bề mặt cho đến phụ kiện đều được kiểm tra theo checklist thống nhất.",
          "Cách làm này giúp công trình hạn chế phát sinh, đồng thời giữ cho quá trình lắp đặt diễn ra gọn và an toàn hơn.",
        ],
      ),
      section(
        "ban-giao",
        "Bàn giao công trình",
        [
          "Khi bàn giao, khách hàng không chỉ nhận một không gian hoàn thiện, mà còn nhận bộ hồ sơ và hướng dẫn vận hành rõ ràng.",
          "Đó là nền tảng để sử dụng bền hơn và xử lý nhanh hơn khi cần bảo trì về sau.",
        ],
      ),
    ],
    relatedSlugs: [],
  }),
  createServiceArticle({
    slug: "bao-hanh-bao-tri-noi-that",
    categoryLabel: "Dịch vụ",
    categoryHref: "/dich-vu",
    title: "Bảo hành & bảo trì",
    summary:
      "Dịch vụ hậu mãi giúp công trình giữ được độ ổn định và thẩm mỹ trong suốt quá trình sử dụng.",
    heroImage: PHO_GIA_COMPANY.heroPoster,
    heroAlt: "Bảo hành và bảo trì nội thất Phố Gia",
    publishedAt: SITE_BUILD_DATE_ISO,
    dateLabel: formatDisplayDate(SITE_BUILD_DATE_ISO),
    readTime: "4 phút",
    meta: [
      { label: "Loại", value: "Hậu mãi" },
      { label: "Thời gian", value: "Dài hạn" },
      { label: "Mục tiêu", value: "Vận hành ổn định" },
    ],
    tags: ["Bảo hành", "Bảo trì", "Hậu mãi"],
    sections: [
      section(
        "y-nghia",
        "Vì sao hậu mãi quan trọng",
        [
          "Nội thất không kết thúc ở ngày bàn giao. Trong quá trình sử dụng, các phụ kiện, bề mặt và cấu tạo có thể cần được kiểm tra lại để duy trì hiệu quả vận hành.",
          "Một dịch vụ bảo hành và bảo trì tốt giúp khách hàng yên tâm hơn về chi phí dài hạn lẫn độ bền công trình.",
        ],
        [
          "Kiểm tra các điểm chịu lực và phụ kiện.",
          "Xử lý nhanh các phát sinh sau sử dụng.",
          "Giữ thẩm mỹ công trình ổn định lâu dài.",
        ],
      ),
      section(
        "quy-trinh",
        "Quy trình hỗ trợ",
        [
          "Phố Gia tiếp nhận yêu cầu, kiểm tra thực tế, xác định nguyên nhân và đề xuất phương án xử lý phù hợp với từng công trình.",
          "Mục tiêu là khôi phục chất lượng vận hành mà không làm ảnh hưởng đến tổng thể thiết kế ban đầu.",
        ],
      ),
      section(
        "cam-ket",
        "Cam kết sau bàn giao",
        [
          "Khách hàng luôn có một đầu mối rõ ràng để liên hệ khi cần hỗ trợ.",
          "Đó là cách Phố Gia giữ trọn trách nhiệm cho công trình, không để việc bàn giao là điểm kết thúc của trải nghiệm.",
        ],
      ),
    ],
    relatedSlugs: [],
  }),
];

const NEWS_ITEMS_WITH_RELATION = NEWS_ITEMS.map((item) =>
  createNewsArticle({
    slug: item.slug,
    categoryLabel: "Tin tức",
    categoryHref: "/tin-tuc",
    title: item.title,
    summary: item.summary,
    heroImage: item.heroImage,
    heroAlt: item.heroAlt,
    publishedAt: item.publishedAt,
    dateLabel: item.meta[1].value,
    readTime: item.readTime,
    meta: item.meta,
    tags: item.tags,
    sections: item.sections,
  }),
);

export const ABOUT_ARTICLE: ArticleItem = {
  ...ABOUT_GUIDE_ARTICLE,
  relatedSlugs: [
    SERVICE_ITEMS[0].slug,
    PROJECT_ITEMS[0].slug,
    NEWS_ITEMS_WITH_RELATION[0].slug,
  ],
};

const SERVICE_BY_INDEX = new Map<string, ArticleItem[]>();
SERVICE_ITEMS.forEach((item) => {
  const list = SERVICE_BY_INDEX.get(item.categoryLabel) ?? [];
  list.push(item);
  SERVICE_BY_INDEX.set(item.categoryLabel, list);
});

SERVICE_ITEMS.forEach((item) => {
  const list = SERVICE_BY_INDEX.get(item.categoryLabel) ?? [];
  item.relatedSlugs = list
    .filter((candidate) => candidate.slug !== item.slug)
    .slice(0, 3)
    .map((candidate) => candidate.slug);
});

const NEWS_BY_CATEGORY = new Map<string, ArticleItem[]>();
NEWS_ITEMS_WITH_RELATION.forEach((item) => {
  const list = NEWS_BY_CATEGORY.get(item.categoryLabel) ?? [];
  list.push(item);
  NEWS_BY_CATEGORY.set(item.categoryLabel, list);
});

NEWS_ITEMS_WITH_RELATION.forEach((item) => {
  const list = NEWS_BY_CATEGORY.get(item.categoryLabel) ?? [];
  item.relatedSlugs = list
    .filter((candidate) => candidate.slug !== item.slug)
    .slice(0, 3)
    .map((candidate) => candidate.slug);
});

export const PROJECT_ARTICLES = PROJECT_ITEMS;
export const SERVICE_ARTICLES = SERVICE_ITEMS;
export const NEWS_ARTICLES = NEWS_ITEMS_WITH_RELATION;

export const PROJECT_COLLECTION: ArchiveCollection = {
  slug: "du-an",
  label: "Dự án",
  title: "Dự án tiêu biểu",
  description:
    "Khám phá các công trình Phố Gia đã triển khai theo nhịp điệu căn hộ, nhà phố, villa và thi công nội thất thực tế.",
  eyebrow: "Công trình thực hiện",
  heroImage: PHO_GIA_COMPANY.processDesktop,
  heroAlt: "Dự án Phố Gia",
  filters: ["Căn hộ", "Nhà phố & villa", "Thi công nội thất"],
  ctaLabel: "Đặt lịch tư vấn dự án",
  ctaHref: "/lien-he",
  featuredSlug: PROJECT_ITEMS[0]?.slug,
  items: PROJECT_ITEMS,
};

export const SERVICE_COLLECTION: ArchiveCollection = {
  slug: "dich-vu",
  label: "Dịch vụ",
  title: "Dịch vụ của Phố Gia",
  description:
    "Từ tư vấn, thiết kế đến thi công và bảo hành, mọi dịch vụ đều được tổ chức theo một quy trình thống nhất và rõ ràng.",
  eyebrow: "Hệ dịch vụ",
  heroImage: PHO_GIA_COMPANY.processThumb,
  heroAlt: "Dịch vụ Phố Gia",
  filters: ["Tư vấn", "Thiết kế", "Thi công", "Bảo hành"],
  ctaLabel: "Tìm hiểu dịch vụ",
  ctaHref: "/lien-he",
  featuredSlug: SERVICE_ITEMS[0]?.slug,
  items: SERVICE_ITEMS,
};

export const NEWS_COLLECTION: ArchiveCollection = {
  slug: "tin-tuc",
  label: "Tin tức",
  title: "Tin tức & cảm hứng",
  description:
    "Những bài viết ngắn gọn nhưng có chiều sâu về vật liệu, ánh sáng, ngân sách và các quyết định quan trọng trong một dự án nội thất.",
  eyebrow: "Bài viết mới",
  heroImage: PHO_GIA_COMPANY.trustImage,
  heroAlt: "Tin tức Phố Gia",
  filters: ["Xu hướng", "Ngân sách", "Ánh sáng", "Vật liệu"],
  ctaLabel: "Khám phá bài viết",
  ctaHref: "/lien-he",
  featuredSlug: NEWS_ITEMS_WITH_RELATION[0]?.slug,
  items: NEWS_ITEMS_WITH_RELATION,
};

export const SITE_PAGES = ["/", "/gioi-thieu", "/du-an", "/dich-vu", "/tin-tuc", "/lien-he"] as const;

export const ALL_ARTICLES: ArticleItem[] = [
  ABOUT_ARTICLE,
  ...PROJECT_ARTICLES,
  ...SERVICE_ARTICLES,
  ...NEWS_ARTICLES,
];

export function getArticleBySlug(
  collection: "gioi-thieu" | "du-an" | "dich-vu" | "tin-tuc",
  slug: string,
) {
  switch (collection) {
    case "gioi-thieu":
      return ABOUT_ARTICLE.slug === slug ? ABOUT_ARTICLE : null;
    case "du-an":
      return PROJECT_ARTICLES.find((item) => item.slug === slug) ?? null;
    case "dich-vu":
      return SERVICE_ARTICLES.find((item) => item.slug === slug) ?? null;
    case "tin-tuc":
      return NEWS_ARTICLES.find((item) => item.slug === slug) ?? null;
    default:
      return null;
  }
}

export function getCollectionBySlug(collection: "du-an" | "dich-vu" | "tin-tuc") {
  switch (collection) {
    case "du-an":
      return PROJECT_COLLECTION;
    case "dich-vu":
      return SERVICE_COLLECTION;
    case "tin-tuc":
      return NEWS_COLLECTION;
  }
}

export function getRelatedArticles(article: ArticleItem) {
  return article.relatedSlugs
    .map((slug) => ALL_ARTICLES.find((item) => item.slug === slug))
    .filter((item): item is ArticleItem => Boolean(item));
}

export function getAllStaticPaths() {
  return [
    ...SITE_PAGES,
    ...PROJECT_ARTICLES.map((item) => `/du-an/${item.slug}`),
    ...SERVICE_ARTICLES.map((item) => `/dich-vu/${item.slug}`),
    ...NEWS_ARTICLES.map((item) => `/tin-tuc/${item.slug}`),
  ];
}
