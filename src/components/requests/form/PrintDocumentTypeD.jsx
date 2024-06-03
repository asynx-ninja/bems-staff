import React, { useState, useEffect } from "react";
import {
  Font,
  Image,
  Text,
  View,
  Page,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";
import logo from "../../../assets/header/montalban-logo.png";
import BALITE from "../../../assets/logo/BALITE.png";
import BURGOS from "../../../assets/logo/BURGOS.png";
import GERONIMO from "../../../assets/logo/GERONIMO.png";
import MACABUD from "../../../assets/logo/MACABUD.png";
import MANGGAHAN from "../../../assets/logo/MANGGAHAN.png";
import MASCAP from "../../../assets/logo/MASCAP.png";
import PURAY from "../../../assets/logo/PURAY.png";
import ROSARIO from "../../../assets/logo/ROSARIO.png";
import SAN_ISIDRO from "../../../assets/logo/SAN_ISIDRO.png";
import SAN_JOSE from "../../../assets/logo/SAN_JOSE.png";
import SAN_RAFAEL from "../../../assets/logo/SAN_RAFAEL.png";
import OETMT from "../../../assets/fonts/Old-English-Text-MT.otf";
import ESITC from "../../../assets/fonts/Edwardian-Script-ITC.otf";
import axios from "axios";
import API_LINK from "../../../config/API";
import moment from "moment";

Font.register({
  family: "Old-English-Text-MT",
  src: OETMT,
});

Font.register({
  family: "Edwardian-Script-ITC",
  src: ESITC,
});

const PrintDocumentTypeD = ({
  detail,
  officials = { officials },
  docDetails,
  brgy,
}) => {
  const [date, setDate] = useState(new Date());


  const returnLogo = () => {
    switch (detail.brgy) {
      case "BALITE":
        return BALITE;

      case "BURGOS":
        return BURGOS;

      case "GERONIMO":
        return GERONIMO;

      case "MACABUD":
        return MACABUD;

      case "MANGGAHAN":
        return MANGGAHAN;

      case "MASCAP":
        return MASCAP;

      case "PURAY":
        return PURAY;

      case "ROSARIO":
        return ROSARIO;

      case "SAN ISIDRO":
        return SAN_ISIDRO;

      case "SAN JOSE":
        return SAN_JOSE;

      case "SAN RAFAEL":
        return SAN_RAFAEL;
    }
  };

  const formatBday = (bday) => {
    const formattedBirthday = bday.toLocaleDateString("en-PH", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    return formattedBirthday;
  };

  const getOrdinalSuffix = (day) => {
    if (day >= 11 && day <= 13) {
      return "th";
    }
    const lastDigit = day % 10;
    switch (lastDigit) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  const day = date.getDate();
  const ordinalSuffix = getOrdinalSuffix(day);

  const birthdayFormat = "MMMM DD, YYYY";

  const formattedDate = `${day}${ordinalSuffix} day of ${date.toLocaleDateString(
    "en-PH",
    {
      month: "long",
      year: "numeric",
    }
  )}`;

  const createdAtFormatted = new Date(detail.createdAt).toLocaleDateString(
    "en-PH",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  const formattedTime = date.toLocaleTimeString("en-PH", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });

  const filterPersonalInformation = (form) => {
    const filtered = Object.keys(form)
      .filter((key) => !["user_id", "id_pic"].includes(key))
      .reduce((obj, key) => {
        obj[key] = form[key];
        return obj;
      }, {});

    return filtered;
  };

  const romanize = (num) => {
    var lookup = {
        M: 1000,
        CM: 900,
        D: 500,
        CD: 400,
        C: 100,
        XC: 90,
        L: 50,
        XL: 40,
        X: 10,
        IX: 9,
        V: 5,
        IV: 4,
        I: 1,
      },
      roman = "",
      i;
    for (i in lookup) {
      while (num >= lookup[i]) {
        roman += i;
        num -= lookup[i];
      }
    }

    return roman;
  };

  const terms = [
    "I am an existing resident applying for this request form of this barangay.",
    "I understand the procedures, terms, and conditions as displayed before I fill-out this service request form.",
    "All information provided are true and complete to the best of my knowledge.",
    "I will immediately inform my barangay of any updates/changes from the information/documents submitted.",
    "All documents submitted are original/authenticated copies, and information stated therein are true and correct.",
    "In compliance with the Data Privacy Act of 2012, I give consent to my barangay to collect, process, and evaluate information needed for this service application form.",
  ];

  const styles = StyleSheet.create({
    body: {
      paddingTop: 5,
      paddingLeft: 35,
      paddingRight: 35,
      paddingBottom: 35,
    },
    letterHead: {
      view1: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
      },
      image: {
        width: 50,
      },
      view2: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      },
      republic: {
        fontFamily: "Old-English-Text-MT",
        fontSize: 8,
      },
      municipality: {
        fontFamily: "Old-English-Text-MT",
        fontSize: 8,
        lineHeight: 1,
        marginTop: 3,
      },
      municipality1: {
        fontFamily: "Times-Bold",
        fontSize: 8,
        fontWeight: 700,
        marginTop: 3,
      },
      brgy: {
        fontFamily: "Times-Bold",
        fontSize: 10,
        fontWeight: 700,
        marginTop: 3,
      },
      office: {
        fontFamily: "Edwardian-Script-ITC",
        fontSize: 26,
      },
    },
    title: {
      view1: {
        paddingTop: 5,
        paddingBottom: 10,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 10,
      },
      req: {
        fontSize: 24,
        fontFamily: "Times-Bold",
        fontWeight: 700,
        // textDecoration: "underline",
      },
      id: {
        paddingTop: 3,
        fontSize: 11,
        fontFamily: "Times-Bold",
      },
    },
    bodyHead: {
      bodyParent: {
        paddingVertical: 12,
        borderWidth: 2,
        borderColor: "#000000",
      },
      view1: {
        paddingBottom: 8,
        paddingHorizontal: 12,
        fontSize: 11,
      },
      parent: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        fontSize: 12,
      },
      bodyTitles: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        paddingHorizontal: 12,
      },
      text: {
        fontFamily: "Helvetica-Bold",
        fontWeight: 700,
        fontSize: 12,
      },
      image: {
        objectFit: "cover",
        outlineWidth: 2,
        backgroundColor: "#ffffff",
        height: 100,
        width: 100,
      },
      column: {
        display: "flex",
        flexDirection: "column",
        marginBottom: 2,
        paddingHorizontal: 12,
      },
    },
    info: {
      parent: {
        paddingHorizontal: 12,
      },
      header: {
        fontFamily: "Helvetica-Bold",
        fontWeight: 700,
        fontSize: 16,
        borderBottomWidth: 2,
        borderColor: "#000000",
        marginTop: 10,
      },
      table: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        flexWrap: "wrap",
        marginTop: 10,
        border: 2,
        borderColor: "#000000",
      },
      tableCell: {
        flex: "1 0 21%",
        padding: 8,
        borderTop: 1,
        borderColor: "#000000",
        outlineWidth: 1,
      },
      label: {
        fontFamily: "Helvetica-Bold",
        fontSize: 10,
        fontWeight: 700,
      },
      value: {
        fontSize: 12,
      },
    },
    terms: {
      parent: {
        paddingLeft: 12,
        paddingRight: 12,
        paddingTop: 12,
        marginLeft: 12,
        marginRight: 12,
        marginTop: 12,
        borderWidth: 2,
        borderColor: "#000000",
      },
      bold: {
        fontFamily: "Helvetica-Bold",
        fontWeight: 700,
        fontSize: 10,
      },
      underline: {
        textDecoration: "underline",
      },
      listParent: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        marginVertical: 10,
      },
      listChild: {
        fontSize: 10,
        fontStyle: "italic",
        display: "flex",
        flexDirection: "row",
      },
      text: {
        fontFamily: "Helvetica-Oblique",
        textAlign: "justify",
        marginLeft: 5,
        fontStyle: "italic",
      },
      parentSign: {
        display: "flex",
        flexDirection: "row",
        marginVertical: 4,
        width: "100%",
        gap: 10,
      },
      half: {
        width: "50%",
      },
      imageStyle: {
        height: 50,
        marginLeft: "auto",
        marginRight: "auto",
      },
      signText: {
        borderWidth: 0,
        borderTopWidth: 2,
        borderColor: "#000000",
        fontFamily: "Helvetica-Bold",
        fontSize: 10,
        fontWeight: 700,
      },
      center: {
        textAlign: "center",
      },
    },
    footer: {
      view: {
        display: "flex",
        flexDirection: "row",
        paddingHorizontal: 8,
        justifyContent: "space-between",
      },
      text: {
        fontFamily: "Helvetica-Bold",
        fontSize: 10,
        fontWeight: 700,
      },
    },
    backgroundImage: {
      position: "absolute",
      height: "550px",
      width: "100%",
      top: 25,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: 0.1, // Set the opacity of the background image
    },
  });

  const TwoColumns = ({ children }) => (
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      {children}
    </View>
  );

  const Divider = () => (
    <View
      style={{
        borderBottomWidth: 2,
        borderBottomColor: "#000000",
        marginTop: 10,
        marginBottom: 10,
      }}
    />
  );

  const LetterHead = () => (
    <View style={styles.letterHead.view1}>
      <Image
        src={returnLogo()}
        alt=""
        srcset=""
        style={styles.letterHead.image}
      />

      <View style={styles.letterHead.view2}>
        <Text style={styles.letterHead.republic}>
          Republic of the Philippines
        </Text>
        <Text style={styles.letterHead.municipality}>Province of Rizal</Text>
        <Text style={styles.letterHead.municipality1}>
          Municipality of Rodriguez
        </Text>
        <Text style={styles.letterHead.brgy}>BARANGAY {detail.brgy}</Text>
      </View>
      <Image src={logo} alt="" srcset="" style={styles.letterHead.image} />
    </View>
  );

  const Body = () => (
    <View>
      {/* TERMS */}
      <View style={{ marginLeft: 10, marginRight: 10, marginTop: 10 }}>
        <TwoColumns>
          <View
            style={{
              flexDirection: "column",
              borderColor: "black",
              borderWidth: 1,
              padding: 8,
            }}
          >
            <LetterHead />
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  marginTop: 10,
                  // textAlign: "justify",
                  fontSize: 8,
                  lineHeight: 1.5,
                  fontFamily: "Times-Roman",
                }}
              >
                {docDetails.map((doc, index) => (
                  <React.Fragment key={index}>
                    {Object.entries(doc.inputs)
                      .reduce((text, [key, value]) => {
                        const placeholder = new RegExp(
                          `\\(\\(${key}\\)\\)`,
                          "g"
                        );
                        let replacementValue = "";

                        // Loop through all possible data in detail.form?.[1]
                        for (let i = 0; i < detail.form?.[1]?.length; i++) {
                          const possibleData = detail.form?.[1]?.[i]?.form;

                          // Check if possibleData is an array and has matching variable
                          if (Array.isArray(possibleData)) {
                            const matchingEntry = possibleData.find(
                              (entry) => entry.variable === value
                            );

                            // If matching entry is found, get its value
                            if (matchingEntry) {
                              replacementValue = matchingEntry.value || "";
                              break; // Stop searching if a matching entry is found
                            }
                          }
                        }

                        // If no matching entry is found in detail.form?.[1]?.[all possible data]?.form?,
                        // check detail.form?.[0]?.[value]?.value
                        if (!replacementValue) {
                          replacementValue =
                            detail.form?.[0]?.[value]?.value || "";
                        }

                        
                        // Format birthday value using moment if the key is 'birthday'
                        if (value === "birthday" && replacementValue) {
                          const dateMoment = moment(
                            replacementValue,
                            "YYYY-MM-DD"
                          );
                          replacementValue = dateMoment.isValid()
                            ? dateMoment.format(birthdayFormat)
                            : replacementValue;
                        }

                        // Replace the placeholder in the text
                        return text.replace(
                          placeholder,
                          replacementValue || ""
                        );
                      }, doc.details)
                      .replace(/\{CurrentDate\}/g, formattedDate)}
                  </React.Fragment>
                ))}
              </Text>
              <View
                style={{
                  width: 85,
                  height: 73,
                  borderColor: "black",
                  borderWidth: 1,
                  marginLeft: 50,
                  marginTop: 3,
                }}
              ></View>
            </View>
            <Text
              style={{
                marginLeft: 248,
                borderTopWidth: 1,
                borderTopColor: "black",
              }}
            ></Text>
            <Text style={{ marginLeft: 272, fontSize: 8 }}>Signature</Text>
          </View>

          <View
            style={{
              borderColor: "black",
              borderWidth: 1,
              padding: 8,
            }}
          >
            <Text
              style={{
                marginTop: 10,
                // textAlign: "justify",
                fontSize: 8,
                lineHeight: 1.5,
                fontFamily: "Times-Bold",
                marginRight: 20,
              }}
            >
              IN CASE OF EMERGENCY:{"\n"}
              Name: {detail.form && detail.form[1]?.[0]?.form[1]?.value}
              {"\n"}
              Contact Number:{" "}
              {detail.form && detail.form[1]?.[0]?.form[2]?.value}
              {"\n"}
              Address: {detail.form && detail.form[1]?.[0]?.form[3]?.value}
              {"\n"}
              {"\n"}
              <Text
                style={{
                  fontFamily: "Times-Bold",
                  fontSize: 8,
                  textIndent: 90,
                }}
              >
                THIS CARD IS NON-TRANSFERRABLE {"\n"}
              </Text>
              <Text
                style={{
                  fontFamily: "Times-Bold",
                  fontSize: 8,
                  textIndent: 15,
                }}
              >
                This is to certify that the bearer of this card whose picture
                and signature appear hereon is a {"\n"}
              </Text>
              <Text style={{ fontFamily: "Times-Bold", fontSize: 8 }}>
                bona fide resident of Barangay {brgy} RODRIGUEZ, RIZAL. {"\n"}
              </Text>
              <Text
                style={{
                  fontFamily: "Times-Bold",
                  fontSize: 8,
                  textIndent: 15,
                }}
              >
                If found, please return to the Barangay Secretariat or to any
                Officials of Barangay {brgy}
              </Text>
            </Text>
            <View style={{ ...styles.terms.half, marginTop: 10 }}>
              {officials
                .filter((official) => official.position === "Barangay Chairman")
                .map((official) => (
                  <Text
                    style={{
                      fontSize: 10,
                      textIndent: 90,
                      lineHeight: 1.5, // Adjust the lineHeight as needed
                    }}
                  >
                    {official.lastName}, {official.firstName}{" "}
                    {official.middleName}
                  </Text>
                ))}
              <View>
                <Text
                  style={{
                    fontSize: 8,
                    fontFamily: "Times-Bold",
                    marginLeft: 130,
                  }}
                >
                  Punong Barangay
                </Text>
              </View>
            </View>
          </View>
        </TwoColumns>
        <View
          style={{
            ...styles.terms.parentSign,
            justifyContent: "flex-end",
            marginTop: 50,
            fontFamily: "Times-Roman",
          }}
        ></View>
      </View>
    </View>
  );

  const Footer = () => (
    <View style={{ ...styles.footer.view, marginTop: 30 }}>
      <Text style={styles.footer.text}>THIS FORM IS NOT FOR SALE</Text>
      <Text style={styles.footer.text}>{detail.version}</Text>
    </View>
  );

  return (
    <Document>
      <Page size="A4" style={styles.body} orientation="landscape">
        <Body />
        {/* <Footer /> */}
      </Page>
    </Document>
  );
};

export default PrintDocumentTypeD;
