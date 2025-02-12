import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import {
  formatDateString,
  formatStringWithSpacing,
} from "@/lib/helperFunctions";

interface InvestmentPDFProps {
  name: string;
  shares: number;
  amount: number;
  date: string;
  dueDate: string;
  idNumber: string;
  companyDetails: {
    name: string;
    bankDetails: {
      accountNumber: string;
      bankName: string;
      accountHolder: string;
    };
    address: string;
    orgNumber: string;
  };
}

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    padding: 30,
  },
  header: {
    fontSize: 22,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  table: {
    display: "flex",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    minHeight: 35,
    alignItems: "center",
  },
  tableCol: {
    width: "50%",
    paddingLeft: 8,
  },
  tableCell: {
    fontSize: 12,
    padding: 5,
  },
  tableCellBold: {
    fontSize: 12,
    padding: 5,
    fontWeight: "bold",
    backgroundColor: "#f3f4f6",
  },
  bankInfo: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#f3f4f6",
    borderRadius: 5,
  },
  bankInfoTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
  },
  bankInfoRow: {
    flexDirection: "row",
    marginBottom: 5,
  },
  bankLabel: {
    fontSize: 12,
    fontWeight: "bold",
    width: "40%",
  },
  bankValue: {
    fontSize: 12,
    width: "60%",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 10,
  },
});

const InvestmentPDF: React.FC<InvestmentPDFProps> = (props) => {
  const { companyDetails } = props;

  console.log("PDF Props:", props);
  console.log("ID Number:", props.idNumber);

  const idType =
    props.idNumber?.length === 11 ? "Fødselsnummer" : "Organisasjonsnummer";
  console.log("ID Type:", idType);

  const formattedIdNumber = props.idNumber
    ? formatStringWithSpacing(props.idNumber, [3, 3])
    : "---";
  console.log("Formatted ID Number:", formattedIdNumber);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>Bekreftelse på tegning av aksjer</Text>

        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCellBold}>Kontaktperson</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{props.name}</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCellBold}>{idType}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{formattedIdNumber}</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCellBold}>Tegnet antall aksjer</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {props.shares.toLocaleString("no-NO")}
              </Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCellBold}>Sum tegnet</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                NOK {props.amount.toLocaleString("no-NO")}
              </Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCellBold}>Tegningsdato</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {formatDateString(props.date)}
              </Text>
            </View>
          </View>
          <View style={[styles.tableRow, { borderBottomWidth: 0 }]}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCellBold}>Investering i</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {companyDetails.bankDetails.accountHolder}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.bankInfo}>
          <Text style={styles.bankInfoTitle}>Betalingsinformasjon</Text>
          <View style={styles.bankInfoRow}>
            <Text style={styles.bankLabel}>Kontoinnehaver:</Text>
            <Text style={styles.bankValue}>
              {companyDetails.bankDetails.accountHolder}
            </Text>
          </View>
          <View style={styles.bankInfoRow}>
            <Text style={styles.bankLabel}>Bank:</Text>
            <Text style={styles.bankValue}>
              {companyDetails.bankDetails.bankName}
            </Text>
          </View>
          <View style={styles.bankInfoRow}>
            <Text style={styles.bankLabel}>Kontonummer:</Text>
            <Text style={styles.bankValue}>
              {formatStringWithSpacing(
                companyDetails.bankDetails.accountNumber,
                [3, 3]
              )}
            </Text>
          </View>
          <View style={styles.bankInfoRow}>
            <Text style={styles.bankLabel}>Forfallsdato:</Text>
            <Text style={styles.bankValue}>
              {formatDateString(props.dueDate)}
            </Text>
          </View>
          <View style={styles.bankInfoRow}>
            <Text style={styles.bankLabel}>Beløp:</Text>
            <Text style={styles.bankValue}>
              NOK {props.amount.toLocaleString("no-NO")}
            </Text>
          </View>
          <View style={styles.bankInfoRow}>
            <Text style={styles.bankLabel}>Melding:</Text>
            <Text style={styles.bankValue}>
              {props.name} - {props.shares}
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text>
            {companyDetails.name} - C. Sundts gate 55, 5004 Bergen - Orgnr:{" "}
            {formatStringWithSpacing("830068112", [3, 3])}
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default InvestmentPDF;
