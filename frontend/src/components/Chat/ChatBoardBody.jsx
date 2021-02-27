import React from "react";
import { Wrapper} from "./styles/ChatBoardBody.styles";
import Bubble from "./Bubble";
import { useThemeUI } from "theme-ui";
const ChatBoardBody = () => {
  const { colorMode } = useThemeUI();
  return (
    <Wrapper theme={colorMode}>
      {messagesExample.map((message, idx) => (
        <Bubble key={idx} data={message} />
      ))}
    </Wrapper>
  );
};

const messagesExample = [
  {
    user: "me",
    name: "Teemo",
    avatar:
      "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Teemo_0.jpg",
    type: "text",
    message: "Hello, I'm robot",
    createdAt: new Date(),
  },
  {
    user: "you",
    name: "Tristana",
    avatar:
      "https://i.pinimg.com/originals/a0/20/80/a02080c5f3f323b9be669ff93c10c94c.png",
    type: "text",
    message:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi dolor sed ratione quis repudiandae exercitationem facilis assumenda dignissimos doloribus aut voluptates molestiae, at aliquid consectetur neque quidem earum, maxime dolorem iste voluptas obcaecati. Cupiditate animi sunt ut odio numquam voluptate ducimus iure sequi, quisquam necessitatibus temporibus quam veniam nemo, cum laudantium odit repellendus error pariatur officiis earum fugit accusamus voluptatibus quod facere! Minima enim fugiat dignissimos, accusantium cum, suscipit voluptate, illum quidem impedit perspiciatis culpa at inventore repudiandae saepe! Et est exercitationem, facilis, soluta accusantium iusto obcaecati deserunt nobis iste quo cumque magnam qui dicta neque voluptate ducimus quam. Quaerat aspernatur reiciendis reprehenderit. Obcaecati cupiditate laborum sit accusantium reprehenderit nam, culpa eos fuga minima eaque veritatis velit molestias optio quod excepturi amet, dignissimos aut ipsum cum alias ducimus saepe doloremque! A illum temporibus, quae esse aliquid vero dignissimos quisquam exercitationem voluptatum! Inventore labore blanditiis, tenetur natus quo alias cupiditate quos recusandae autem atque pariatur ratione exercitationem dolore deleniti quas eligendi unde ipsum obcaecati molestiae rem odio animi itaque. Unde, temporibus odio? Ipsa culpa odit delectus voluptas asperiores modi error beatae nesciunt, mollitia est laboriosam. Repellat tempora fuga dolorem magni porro incidunt? Labore voluptatum veniam laudantium, sequi natus error quod veritatis.",
    createdAt: new Date(),
  },
  {
    user: "me",
    name: "Teemo",
    avatar:
      "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Teemo_0.jpg",
    type: "blob",
    filename: "picture",
    filetype: "image/png",
    fileurl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR30zJAlreYQFIFcK9HAH3w8RYXBavLvPHMtw&usqp=CAU",
    message: "This is my avatar",
    createdAt: new Date(),
  },
  {
    user: "you",
    name: "Tristana",
    avatar:
      "https://i.pinimg.com/originals/a0/20/80/a02080c5f3f323b9be669ff93c10c94c.png",
    type: "text",
    message: "Send me your profile",
    createdAt: new Date(),
  },
  {
    user: "me",
    name: "Teemo",
    avatar:
      "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Teemo_0.jpg",
    type: "text",
    message:
      "https://www.messengerpeople.com/wp-content/uploads/2018/08/erfolge-chatbots.png",
    createAt: new Date(),
  },
];
export default ChatBoardBody;
