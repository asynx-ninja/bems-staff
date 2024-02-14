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
import id_picture from "../../../assets/sample/official.jpg";
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
import BAGONG_PILIPINAS from "../../../assets/image/bagong-pilipinas-logo.jpg";

Font.register({
  family: "Old-English-Text-MT",
  src: OETMT,
});

Font.register({
  family: "Edwardian-Script-ITC",
  src: ESITC,
});

const PrintDocumentTypeE = ({
  detail,
  officials = { officials },
  docDetails,
  brgy,
}) => {
  const [date, setDate] = useState(new Date());
  console.log("docDetails sa pdf: ", docDetails);

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

  const birthdayFormatted = new Date(detail.birthday).toLocaleDateString(
    "en-PH",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  const formattedDate = date.toLocaleDateString("en-PH", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  });

  const formattedDate2 = date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

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
        width: 90,
      },
      view2: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      },
      republic: {
        fontFamily: "Old-English-Text-MT",
        fontSize: 14,
      },
      municipality: {
        fontFamily: "Old-English-Text-MT",
        fontSize: 14,
        lineHeight: 1,
        marginTop: 3,
      },
      municipality1: {
        fontFamily: "Times-Bold",
        fontSize: 14,
        fontWeight: 700,
        marginTop: 3,
      },
      brgy: {
        fontFamily: "Times-Bold",
        fontSize: 18,
        fontWeight: 700,
        marginTop: 3,
      },
      office: {
        fontFamily: "Edwardian-Script-ITC",
        fontSize: 30,
      },
    },
    title: {
      view1: {
        paddingTop: 12,
        paddingBottom: 12,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      },
      req: {
        fontSize: 18,
        fontFamily: "Helvetica-Bold",
        fontWeight: 700,
        textDecoration: "underline",
      },
      id: {
        paddingTop: 3,
        fontSize: 8,
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
        marginVertical: 1,
        width: "100%",
        gap: 1,
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
      height: "560px",
      width: "100%",
      top: 20,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: 0.1, // Set the opacity of the background image
    },
  });

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
        <Text style={styles.letterHead.office}>
          Office of the Barangay Chairman
        </Text>
      </View>

      <Image src={logo} alt="" srcset="" style={styles.letterHead.image} />
    </View>
  );

  const Body = () => (
    <View>
      {/* TERMS */}
      <View style={{ marginLeft: 10, marginRight: 10 }}>
        <Text
          style={{
            ...styles.terms.bold,
            textAlign: "center",
            fontSize: 20,
            marginVertical: 30,
            fontFamily: "Times-Roman",
          }}
        >
          CERTIFICATION
        </Text>
        <Text
          style={{
            ...styles.terms.bold,
            textAlign: "center",
            fontSize: 16,
            marginBottom: 30,
            fontFamily: "Times-Roman",
          }}
        >
          (First Time Job Seeker Assistance Act. - RA 11261)
        </Text>

        <Text
          style={{
            marginTop: 10,
            textAlign: "justify",
            fontSize: 12,
            lineHeight: 2,
            fontFamily: "Times-Roman",
            textIndent: 30,
          }}
        >
          {docDetails.map((doc, index) => (
            <React.Fragment key={index}>
              {Object.entries(doc.inputs)
                .reduce((text, [key, value]) => {
                  const placeholder = new RegExp(`\\(\\(${key}\\)\\)`, "g");

                  // Check if [value] matches with any variable in the nested structure
                  const matchingVariable = detail.form?.[1]?.[0]?.form?.find(
                    (entry) => entry.variable === value
                  )?.variable;

                  // Get the value from the matching form entry, otherwise use an empty string
                  const replacementValue = matchingVariable
                    ? detail.form?.[1]?.[0]?.form?.find(
                        (entry) => entry.variable === matchingVariable
                      )?.value || ""
                    : detail.form?.[0]?.[value]?.value || "";

                  return text.replace(placeholder, replacementValue);
                }, doc.details)
                .replace(/\{CurrentDate\}/g, formattedDate)}
              {/* <br /> */}
              {/* Add additional line breaks or formatting as needed */}
            </React.Fragment>
          ))}
        </Text>

        <View
          style={{ ...styles.terms.parentSign, justifyContent: "flex-end" }}
        >
          <View style={styles.terms.half}>
            <View style={{ marginTop: 40 }}>
              <Text
                style={{
                  ...styles.terms.bold,
                  // textAlign: "center",
                  marginBottom: 30,
                  fontSize: 12,
                }}
              >
                Certified by:
              </Text>
            </View>

            {officials
              .filter((official) => official.position === "Barangay Chairman")
              .map((official) => (
                <Text
                  style={{
                    fontSize: 12,
                    textAlign: "center",
                    lineHeight: 2, // Adjust the lineHeight as needed
                  }}
                >
                  {official.lastName}, {official.firstName}{" "}
                  {official.middleName}
                </Text>
              ))}
            <View style={styles.terms.signText}>
              <Text style={styles.terms.center}>Punong Barangay</Text>
            </View>

            <View style={{ marginTop: 40 }}>
              <Text
                style={{
                  ...styles.terms.bold,
                  textAlign: "center",
                  marginBottom: 5,
                  fontSize: 12,
                }}
              >
                {formattedDate2}
              </Text>
              <View style={{ ...styles.terms.signText }}>
                <Text style={styles.terms.center}>Date</Text>
              </View>
            </View>

            <View style={{ marginTop: 40 }}>
              <Text
                style={{
                  ...styles.terms.bold,
                  // textAlign: "center",
                  marginBottom: 5,
                  fontSize: 12,
                }}
              >
                Witnessed by:
              </Text>
            </View>

            {officials
              .filter((official) => official.position === "Secretary")
              .map((official) => (
                <Text
                  style={{
                    fontSize: 12,
                    textAlign: "center",
                    lineHeight: 2, // Adjust the lineHeight as needed
                    marginTop: 25,
                  }}
                >
                  {official.lastName}, {official.firstName}{" "}
                  {official.middleName}
                </Text>
              ))}
            <View style={styles.terms.signText}>
              <Text style={styles.terms.center}>Barangay Secretary</Text>
            </View>
          </View>
        </View>
      </View>
      {/* END OF TERMS */}
    </View>
  );

  const Oath = () => (
    <View>
      {/* TERMS */}
      <View style={{ marginLeft: 10 }}>
        <Text
          style={{
            ...styles.terms.bold,
            textAlign: "center",
            fontSize: 24,
            marginTop: 10,
            fontFamily: "Times-Roman",
          }}
        >
          OATH OF UNDERTAKING
        </Text>
        <Text
          style={{
            fontSize: 12,
            marginTop: 20,
            fontFamily: "Times-Roman",
            textAlign: "justify",
          }}
        >
          I,{" "}
          <Text style={{...styles.terms.bold, textDecoration: "underline",}}>
            {detail.form && detail.form[0]?.firstName?.value}{" "}
            {detail.form && detail.form[0]?.middleName?.value}{" "}
            {detail.form && detail.form[0]?.lastName?.value}
          </Text>
          , {detail.form && detail.form[0]?.age?.value} years old, is a bona
          fide resident of {detail.form && detail.form[0]?.address?.value},
          availing the benefit of RA 11261, otherwise known as{" "}
          <Text style={styles.terms.bold}>
            "First Time Job Seeker Act of 2019"
          </Text>{" "}
          do hereby declare, agree and undertake to abide to be bound by the
          following:
        </Text>
        <Text
          style={{
            marginTop: 10,
            textAlign: "justify",
            fontSize: 12,
            lineHeight: 2, // Adjust the lineHeight as needed\

            fontFamily: "Times-Roman",
          }}
        >
          1. That this is the first time that I will actively look for a job,
          and therefore requesting that a Barangay Certification be issued in my
          favor to avail the benefits of the law.
        </Text>

        <Text
          style={{
            marginTop: 10,
            textAlign: "justify",
            fontSize: 12,
            lineHeight: 2, // Adjust the lineHeight as needed

            fontFamily: "Times-Roman",
          }}
        >
          2. That I am aware that the benefits and privilege/s under the said
          law shall be allowed only for one (1) year from the date that the
          Barangay Certification is issued;
        </Text>

        <Text
          style={{
            marginTop: 5,
            textAlign: "justify",
            fontSize: 12,
            lineHeight: 2, // Adjust the lineHeight as needed

            fontFamily: "Times-Roman",
          }}
        >
          3. That I can avail the benefits of the law only once.
        </Text>

        <Text
          style={{
            marginTop: 5,
            textAlign: "justify",
            fontSize: 12,
            lineHeight: 2, // Adjust the lineHeight as needed

            fontFamily: "Times-Roman",
          }}
        >
          4. That I understand that my personal information shall be included in
          the roaster/list First Time Jobseekers and will not use for any
          unlawful purpose;
        </Text>

        <Text
          style={{
            marginTop: 5,
            textAlign: "justify",
            fontSize: 12,
            lineHeight: 2, // Adjust the lineHeight as needed

            fontFamily: "Times-Roman",
          }}
        >
          5. That I will inform and/or report to the barangay personally,
          through my family relatives once I get employed; and
        </Text>

        <Text
          style={{
            marginTop: 5,
            textAlign: "justify",
            fontSize: 12,
            lineHeight: 2, // Adjust the lineHeight as needed

            fontFamily: "Times-Roman",
          }}
        >
          6. That I am not beneficiary of the Job Start Program under R.A. No.
          10864 and other Laws that give similar exemption for the documents or
          transactions exempted under R.A. No. 11261
        </Text>

        <Text
          style={{
            marginTop: 5,
            textAlign: "justify",
            fontSize: 12,
            lineHeight: 2, // Adjust the lineHeight as needed

            fontFamily: "Times-Roman",
          }}
        >
          7. That is issued the requested certifications, I will not use the
          same in any fraud, neither falsify nor help and/assist in the
          fabrication of the said certification.
        </Text>

        <Text
          style={{
            marginTop: 5,
            textAlign: "justify",
            fontSize: 12,
            lineHeight: 2, // Adjust the lineHeight as needed

            fontFamily: "Times-Roman",
          }}
        >
          8. That this undertaking is made solely for the purpose of obtaining a
          Barangay Certification consistent with the objective of R.A. No. 11261
          and not for any other purpose.
        </Text>

        <Text
          style={{
            marginTop: 5,
            textAlign: "justify",
            fontSize: 12,
            lineHeight: 2, // Adjust the lineHeight as needed

            fontFamily: "Times-Roman",
          }}
        >
          9. That I consent to the use of my personal information pursuant to
          the Data Privacy Act and other applicable laws, rules and regulations.
        </Text>

        <Text
          style={{
            marginTop: 10,
            textAlign: "justify",
            fontSize: 12,
            lineHeight: 2, // Adjust the lineHeight as needed
            fontFamily: "Times-Roman",
          }}
        >
          Done this <Text style={styles.terms.bold}>{formattedDate}</Text>, in
          the office of the Punong Barangay, Brangay {brgy} Rodriguez,
          (Montalban), Rizal.
        </Text>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text
            style={{
              marginTop: 20,
              textAlign: "justify",
              fontSize: 12,
              lineHeight: 2, // Adjust the lineHeight as needed
              fontFamily: "Times-Roman",
            }}
          >
            First Time Job Seeker
          </Text>

          <Text
            style={{
              marginTop: 20,
              textAlign: "justify",
              fontSize: 12,
              lineHeight: 2, // Adjust the lineHeight as needed
              fontFamily: "Times-Roman",
            }}
          >
            Witnessed By:
          </Text>
        </View>

        <View style={{ ...styles.terms.parentSign}}>
          <View style={styles.terms.half}>
            <Text
              style={{
                fontSize: 12,
                textAlign: "center",
                marginTop: 25,
                lineHeight: 2, // Adjust the lineHeight as needed
                fontFamily: "Times-Roman",
              }}
            >
              {detail.form && detail.form[0].firstName.value}{" "}
              {detail.form && detail.form[0].middleName.value}{" "}
              {detail.form && detail.form[0].lastName.value}
            </Text>
            <View style={styles.terms.signText}>
              <Text
                style={{ ...styles.terms.center, fontFamily: "Times-Roman" }}
              >
                Signature over printed name
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{ ...styles.terms.parentSign, justifyContent: "flex-end" }}
        >
          <View style={styles.terms.half}>
            {officials
              .filter((official) => official.position === "Secretary")
              .map((official) => (
                <Text
                  style={{
                    fontSize: 12,
                    textAlign: "center",
                    lineHeight: 2, // Adjust the lineHeight as needed
                    marginTop: 10,
                    fontFamily: "Times-Roman",
                  }}
                >
                  {official.lastName}, {official.firstName}{" "}
                  {official.middleName}
                </Text>
              ))}
            <View style={styles.terms.signText}>
              <Text
                style={{ ...styles.terms.center, fontFamily: "Times-Roman" }}
              >
                Barangay Secretary
              </Text>
            </View>

            <View style={{ marginTop: 10 }}>
              {officials
                .filter(
                  (official) => official.position === "Assistant Secretary"
                )
                .map((official) => (
                  <Text
                    style={{
                      fontSize: 12,
                      textAlign: "center",
                      lineHeight: 2, // Adjust the lineHeight as needed
                      marginTop: 15,
                      fontFamily: "Times-Roman",
                    }}
                  >
                    {official.lastName}, {official.firstName}{" "}
                    {official.middleName}
                  </Text>
                ))}
              <View style={{ ...styles.terms.signText }}>
                <Text
                  style={{ ...styles.terms.center, fontFamily: "Times-Roman" }}
                >
                  Barangay Assistant Secretary
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* END OF TERMS */}
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
      <Page size="Legal" style={styles.body}>
        <LetterHead />
        <Divider />
        <Body />
        {/* <Footer /> */}
      </Page>
      <Page size="Legal" style={styles.body}>
        <LetterHead />
        <Divider />
        <Oath />
        {/* <Footer /> */}
      </Page>
    </Document>
  );
};

export default PrintDocumentTypeE;
