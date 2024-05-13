//package com.springboot.pringboot.JWT;
//
//import java.util.Date;
//import java.util.regex.Matcher;
//import java.util.regex.Pattern;
//
//public class Security {
//
//     public static String generateToken(String password) {
//        return password + "_" + new Date().getTime();
//    }
//    public static String extractPrefix(String password) {
//        Pattern pattern = Pattern.compile("^(\\d+)_");
//        Matcher matcher = pattern.matcher(password);
//        if (matcher.find()) {
//            String prefix = matcher.group(1);
//            return prefix;
//        } else {
//            return "";
//        }
//    }
//
//
//}
//

package com.springboot.pringboot.JWT;
import java.util.Base64;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;


public class Security {

    private static final String SECRET_KEY = "nbhg1548uhygt12548jhurdesw639852";

    public static String generateToken(String password) {
        try {
            String encodedPassword = Base64.getEncoder().encodeToString(password.getBytes());
            return Jwts.builder()
                    .setSubject(encodedPassword)
                    .signWith(SignatureAlgorithm.HS256, SECRET_KEY.getBytes())
                    .compact();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public static String extractToken(String token) {
        try {
            String decodedPassword = Jwts.parser()
                    .setSigningKey(SECRET_KEY.getBytes())
                    .parseClaimsJws(token)
                    .getBody()
                    .getSubject();
            byte[] decodedBytes = Base64.getDecoder().decode(decodedPassword);
            return new String(decodedBytes);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }


}
