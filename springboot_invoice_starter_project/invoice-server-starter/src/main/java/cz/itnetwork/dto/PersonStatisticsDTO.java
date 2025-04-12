package cz.itnetwork.dto;


import lombok.Data;

@Data
public class PersonStatisticsDTO {
    private long personId;
    private String personName;
    private double revenue;

}
