package fr.istic.idm.ffmpeg;

import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Represent a FFMPEG Command.
 * @author Antoine Charpentier
 *
 */
public class FFMPEGCommand {
	private static Logger log = LoggerFactory.getLogger(FFMPEGCommand.class);
	
	private String command;
	
	public FFMPEGCommand(String command) {
		this.command = command;
	}
	
	public boolean execute() {
		log.debug("Executing command {}", this.command);
		Process process;
		try {
			process = Runtime.getRuntime().exec(this.command);
			Thread out = new Thread(new StreamHandler(process.getInputStream(), "OUT"));
			Thread err = new Thread(new StreamHandler(process.getErrorStream(), "ERR"));
			
			out.start(); err.start();
			
			int result = process.waitFor();
			
			log.debug("Process exit with code {}", result);
			return result == 0;
		} catch (IOException | InterruptedException e) {
			log.error(e.getMessage());
			
			if(log.isDebugEnabled())
				e.printStackTrace();
			
			return false;
		}
	}
}