var SPEED = 100
var max_jumps = 2
var jumps = 0
const out_bound = 500
var direction = "left"
const player = add([
  sprite("guy"),
  pos(0,50),
  body(),
  scale(1.50)
]);


const maps = addLevel([
  
  '    >                          ',
  '                               ',
  '    *                     *    ',
  '                               ',
  '========               ========',
  '                               ',
  '                               ',
  '                               ',
  '              *                ',
  '                               ',
  '          ========             ',
  '                               ',
  '                               ',
  '                               ',
  '      *                   *    ',
  '                               ',
  '                               ',
  '===========           ======== ',
  '                               ',
  '                               ',
  '                               ',
  '                               ',
  '      *               *        ',
  '                               ',
  '===============================',

     
], {
  width: 8,
  height: 8,
  pos: vec2(0, 0),
  "=": [
    sprite("floor"),
    solid(),
  ],
  "*": [
    sprite("coffe"),
    "collectable",
    area(vec2(16,16),vec2(16,16))
  ],
  ">": [
    sprite("gomba"),
    pos(50,50),
    "annmy",
    body()
  ]                  
  
  }
);

on("update","annmy",(b) =>{
  b.move(20,0)
});
player.action(() => {
    camPos(player.pos)
    if (player.pos.y >= out_bound) {
      go('main')
    }
});
player.collides("collectable", (c) => {
  destroy(c)
  max_jumps = max_jumps + 1
  
});
keyPress("space",()=>{

    add([
      sprite("bulet"),
      pos(player.pos.x,player.pos.y),
      "bullet",
      "direction:" + direction
    ])

});
player.action(() => {
    if(player.grounded()) {
      jumps = max_jumps
      isJumping = false
    }
});
collides("bullet","annmy",(b,a) => {
  destroy(b)
  destroy(a)
  max_jumps + 1
})
player.collides("annmy",() =>{
  go("main")
})
on("update", "direction:left", (b) => {
    b.move(-200, rand(-5,5));
  

    wait(1, () => {
      destroy(b);
    });
});
on("update", "direction:right", (b) => {
    b.move(200, rand(-5,5));
    b.angle = 0
    wait(1, () => {
      destroy(b);
    });
});
keyPress('r', () => {
  go('main')
});
keyPress('up', () => {
    if (player.grounded()) {
      const fart =add([
        sprite("fart"),
        pos(player.pos.x+6,player.pos.y+10),
      ]);
      isJumping = true
      player.jump(300)
      wait(0.25, () => {
        destroy(fart);
      });
    }else if (jumps >= 1){
      const fart = add([
        sprite("fart"),
        pos(player.pos.x+6,player.pos.y+10),
      ]);
      isJumping = true
      player.jump(400+jumps*10)

      jumps = jumps - 1

      wait(0.25, () => {
      destroy(fart);
      });
    }
})
keyDown("left", () => {
    player.move(-SPEED, 0);
    direction = "left"

});
keyDown("right", () => {
    player.move(SPEED, 0);
    direction = "right"
});