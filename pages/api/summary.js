import { checkToken } from "../../backendLibs/checkToken";
import { readUsersDB } from "../../backendLibs/dbLib";

export default function summaryRoute(req, res) {
  if (req.method === "GET") {
    //check authentication
    const user = checkToken(req);
    if (!user || !user.isAdmin) {
      return res.status(403).json({ ok: false, message: "Permission denied" });
    }
    //return res.status(403).json({ ok: false, message: "Permission denied" });
    //compute DB summary
    const u = readUsersDB();
    let ac = 0;
    let uc = 0;
    let ts = 0;
    const uss = u.map((x) => {
      if (x.isAdmin === true) {
        ac += 1;
      } else {
        uc += 1;
        ts += x.money;
      }
    });
    return res.json({
      ok: true,
      userCount: uc,
      adminCount: ac,
      totalMoney: ts,
    });
    //return response
  } else {
    return res.status(400).json({ ok: false, message: "Invalid HTTP Method" });
  }
}
