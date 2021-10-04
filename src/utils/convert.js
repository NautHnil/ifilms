import slugify from "slugify";

export const convertSlug = (text) => {
  return slugify(text, {
    replacement: "-", // replace spaces with replacement character, defaults to `-`
    remove: /[*+~.()'"!:@]/g, // remove characters that match regex, defaults to `undefined`
    lower: true, // convert to lower case, defaults to `false`
    strict: true, // strip special characters except replacement, defaults to `false`
    locale: "vi", // language code of the locale to use
  });
};

export const decimalMinutesToTime = (number) => {
  let hour, minute, second, decpartH, decpartM, time;
  let min = 1 / 60;
  let totalHour = Number(number * min);

  hour = Number(Math.floor(totalHour));
  decpartH = Number(totalHour - hour);

  let totalMinute = Number(decpartH * 60);
  minute = Number(Math.floor((decpartH * 60).toFixed(2)));
  decpartM = Number(totalMinute - minute);
  second = Number(Math.floor(decpartM * 60));
  time = `${hour}h ${minute}m${second > 0 ? ` ${second}s` : ""}`;

  return time;
};

export const formatToCurrency = (amount) => {
  return new Intl.NumberFormat("en-EN", {
    style: "currency",
    currency: "USD",
  }).format(amount);

  // return amount.toFixed(fixed).replace(/\d(?=(\d{3})+\.)/g, "$&,");
};
