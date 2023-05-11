const randomstring = require('randomstring');
const generate_otp=()=>{
    const otpCode = randomstring.generate({
        length: 6, // Length of the OTP code
        charset: 'numeric' // Only use numeric digits for the OTP code
      });
      return otpCode;

}
module.exports=generate_otp;
