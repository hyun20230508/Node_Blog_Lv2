const express = require("express");
const router = express.Router();
const User = require("../schemas/user.js");

//회원 가입 api
router.post("/signup", async (req, res) => {
  const { nickname, password, confirm } = req.body;
  const searchStr = /[^a-zA-Z0-9]/;
  try {
    if (
      nickname.length < 4 ||
      nickname.length > 16 ||
      nickname.search(searchStr) != -1
    ) {
      res.status(400).json({
        errorMessage:
          "닉네임에는 특수문자 사용이 불가능하며, 4글자 이상 16글자 이하로 작성되어야합니다.",
      });
      return;
    }
    if (password !== confirm) {
      res.status(400).json({
        errorMessage: "패스워드가 패스워드 확인란과 다릅니다.",
      });
      return;
    }

    const existsUsers = await User.findOne({ nickname });
    if (existsUsers) {
      res.status(400).json({
        errorMessage: "중복된 닉네임입니다.",
      });
      return;
    }

    const user = new User({ nickname, password });
    await user.save();

    res.status(201).json({ message: "회원가입이 완료되었습니다." });
  } catch (error) {
    res.status(400).json({ errorMessage: "회원가입에 실패했습니다." });
  }
});

module.exports = router;
