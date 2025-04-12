package cz.itnetwork.dto;


import lombok.Data;

@Data
public class InvoiceStatisticsDTO {
    private double currentYearSum;
    private double allTimeSum;
    private int invoiceCount;

}
