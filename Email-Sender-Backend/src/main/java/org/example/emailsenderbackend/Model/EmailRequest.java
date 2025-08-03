package org.example.emailsenderbackend.Model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class EmailRequest {
    private List<String> recipients;
    private String subject;
    private String message;
    private int repeat;


}
