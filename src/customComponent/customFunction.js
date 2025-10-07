export const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const item = payload[0].payload;
    return (
      <div
        style={{
          background: "rgba(0,0,0,0.8)",
          color: "#fff",
          padding: "8px 12px",
          borderRadius: "10px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
          textAlign: "center",
          fontSize: "13px",
        }}
      >
        <div style={{ 
          fontWeight: "bold", 
          color: item.color,
          width:"10px",
          height:"10px",
          borderRadius:"50%",
          backgroundColor:item.color
          }}>
          
        </div>
        <span 
          style={{
            fontSize:"20px"
          }}
        >{item.value}/900</span>
        <div>leases {item.name}</div>
      </div>
    );
  }
  return null;
};