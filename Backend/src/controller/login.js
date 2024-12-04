const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.userController = {
  login: (req, res) => {
    try {
      console.log("function called....!");
      const users = [
        {
          username: "test@gmail.com",
          password: bcrypt.hashSync("1234567", 10),
        },
      ];
      const { username, password } = req.body;
      const user = users.find((u) => u.username === username);

      if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign({ username }, process.env.SECRET_KEY, {
        expiresIn: "1h",
      });
      res.json({ token });
    } catch (error) {
      return res.status(500).json({ error: "Login failed" });
    }
  },

  dashboard: (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "Token missing" });

    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      res.json({ message: `Welcome ${decoded.username}` });
    } catch {
      res.status(403).json({ message: "Invalid token" });
    }
  },
  upload: (req, res) => {
    console.log(req.file);
    try {
      res.json({
        message: "profile updated...!",
        fileName: req.file.originalname,
      });
    } catch (error) {
      res.status(403).json({ message: "Invalid token" });
    }
  },
};
