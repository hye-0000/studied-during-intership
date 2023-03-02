package kr.co.neighbor21.HyeYoung.VO;

public class postitVO {
    private String user_id;
    private String pi_id;
    private String pi_content;

    public String getUserId() {
        return user_id;
    }

    public void setUserId(String user_id) {
        this.user_id = user_id;
    }

    public String getPiId() {
        return this.pi_id;
    }

    public void setPiId(String pi_id) {
        this.pi_id = pi_id;
    }

    public String getPiContent() {
        return this.pi_content;
    }

    public void setPiContent(String pi_content) {
        this.pi_content = pi_content;
    }

    @Override
    public String toString() {
        return user_id + " " + pi_id + " " + pi_content;
    }
}
