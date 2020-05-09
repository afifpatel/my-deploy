const { PrismaClient } = require("@prisma/client");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const prisma = new PrismaClient();
const app = express();

app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
  })
);

// app.use(express.static('build'));
app.use(express.static(path.join(__dirname, '../frontend/build')));

// app.get('*',  (req, res) => {
//   res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
// });

app.get("/users", async (req, res, next) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (err) {
    next(err);
  }
});

app.get("/comments", async (req, res, next) => {
  try {
    const comments = await prisma.comment.findMany({
      include: {
        user: true,
      },
    });
    res.json(comments);
  } catch (err) {
    next(err);
  }
});

app.post("/comments", async (req, res, next) => {
  try {
    const { user_id, content } = req.body;

    if (!user_id || !content) res.sendStatus(400);

    const comment = await prisma.comment.create({
      data: {
        content,
        user: {
          connect: {
            id: user_id,
          },
        },
      },
    });
    res.json(comment).status(204);
  } catch (err) {
    if (err.code === "P2016") {
      res.sendStatus(400);
    } else {
      next(err);
    }
  }
});

app.get("/replies", async (req, res, next) => {
  const commentId  = req.query.comment_id;
  try {
    if(!commentId) throw "Comment ID required"; 
    const replies = await prisma.reply.findMany({
      include: {
        user: true,
        comment: true,
      },
      where: {
        comment_id: parseInt(commentId)
      }
    });
    res.json(replies)
  } catch (err) {
    next(err);
  }
});

app.post("/replies", async (req, res, next) => {
  try {
    const { user_id, comment_id, content } = req.body;

    if(!user_id || !comment_id || !content) res.sendStatus(400);

    const reply = await prisma.reply.create({
      data: {
        content,
        user: {
          connect: {
            id: user_id,
          },
        },
        comment: {
          connect: {
            id: comment_id,
          }
        },
      },
    });
    res.json(reply).status(204);
  } catch (err) {
    if(err.code === "P2016") {
      res.sendStatus(400);
    } else {
      next(err);
    }
  }
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.toString() });
});

app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
