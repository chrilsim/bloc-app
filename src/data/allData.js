import data from "../data/data.js";
import DataKhmer from "../data/DataKhmer.js";
import DataKorean from "./DataKorean.js";
import DataWestern from "./DataWestern.js";
import DataChinese from "./DataChinese.js";
import DataJapanese from "./DataJapanese.js";
import DaraIndia from "./DataIndia.js"
import DataAsia from "./DataAsia.js"
import DataHalal from "./DataHalal.js"
import DataMart from "./DataMart.js"
import DataMall from "./DataMall.js"

export const AllData = [
  ...data,
  ...DataKhmer,
  ...DataKorean,
  ...DataWestern,
  ...DataChinese,
  ...DataJapanese,
  ...DaraIndia,
  ...DataAsia,
  ...DataHalal,
  ...DataMart,
  ...DataMall,

];

export default AllData;