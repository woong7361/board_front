

export const inquireAnsweredFormat = (title) =>  `${title} [답변 완료]`
export const inquireNoneAnsweredFormat = (title) =>  `${title} [답변 대기]`

export const freeBoardOwner = (name) => name == null ? '---' : name;
export const freeBoardTitle = (title) => title == null ? '[삭제 처리된 게시글입니다.]' : title;
export const boardContent = (content) => content == null ? '[삭제된 내용]' : content.replaceAll("\n", "<br/>").replaceAll(" ", "&nbsp")




