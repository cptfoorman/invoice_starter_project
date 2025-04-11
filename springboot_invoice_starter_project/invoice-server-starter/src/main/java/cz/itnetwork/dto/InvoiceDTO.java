package cz.itnetwork.dto;


import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InvoiceDTO {

    @NotNull
    @JsonProperty("_id")
    private long id;


    @JsonProperty("invoiceNumber")
    private int invoiceNumber;

    private Date issued;
    @JsonProperty("dueDate")
    private Date dueDate;

    private String product;


    private double price;

    private int vat;

    private String note;

    private PersonDTO buyer;

    private PersonDTO seller;

}
