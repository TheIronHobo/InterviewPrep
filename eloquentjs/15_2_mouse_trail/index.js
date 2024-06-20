import { Missile } from "./missile.js";
import { Vector2 } from "./vector2.js";



let missile = new Missile(new Vector2(100, 100));

missile.start();
missile.update();
