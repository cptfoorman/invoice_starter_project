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

    @NotNull
    @Positive
    private Date issued;

    @NotNull
    @Positive
    @JsonProperty("dueDate")
    private Date dueDate;

    @NotNull
    private String product;

    @NotNull
    private double price;

    @NotNull
    private int vat;

    private String note;
    @NotNull
    private PersonDTO buyer;
    @NotNull
    private PersonDTO seller;

}
